import { MapNode, NodeType } from '../core/Types';

export class MapGenerator {
  static generateMap(totalFloors = 7, lanesCount = 3): MapNode[][] {
    const map: MapNode[][] = [];

    // 1. Generate nodes for each floor
    for (let floor = 0; floor < totalFloors; floor++) {
      const floorNodes: MapNode[] = [];
      
      if (floor === totalFloors - 1) {
        // Boss floor: single node in the center lane
        floorNodes.push({
          id: `node_${floor}_1`,
          type: 'boss',
          floor,
          lane: 1,
          connections: [],
          completed: false
        });
      } else {
        // Regular floors: spawn 2 to 3 nodes in different lanes
        const activeLanes = new Set<number>();
        // Ensure at least 2 nodes
        const nodeCount = floor === 0 ? lanesCount : 2 + Math.floor(Math.random() * (lanesCount - 1));
        
        while (activeLanes.size < nodeCount) {
          activeLanes.add(Math.floor(Math.random() * lanesCount));
        }

        Array.from(activeLanes).sort().forEach(lane => {
          let type: NodeType = 'combat';
          
          if (floor === 3) {
            type = 'elite';
          } else if (floor === 5) {
            type = 'shop';
          } else if (floor > 0) {
            const roll = Math.random();
            if (roll < 0.25) {
              type = 'shop';
            } else if (roll < 0.5) {
              type = 'event';
            }
          }

          floorNodes.push({
            id: `node_${floor}_${lane}`,
            type,
            floor,
            lane,
            connections: [],
            completed: false
          });
        });
      }
      map.push(floorNodes);
    }

    // 2. Connect nodes from floor F to floor F + 1
    for (let floor = 0; floor < totalFloors - 1; floor++) {
      const currentNodes = map[floor];
      const nextNodes = map[floor + 1];

      // Ensure every current node has at least one forward connection
      currentNodes.forEach(cNode => {
        // Find closest nodes by lane on the next floor
        const sortedNext = [...nextNodes].sort((a, b) => 
          Math.abs(a.lane - cNode.lane) - Math.abs(b.lane - cNode.lane)
        );
        
        // Connect to closest
        cNode.connections.push(sortedNext[0].id);

        // Optionally connect to second closest (branching paths)
        if (sortedNext.length > 1 && Math.random() < 0.4 && Math.abs(sortedNext[1].lane - cNode.lane) <= 1) {
          cNode.connections.push(sortedNext[1].id);
        }
      });

      // Ensure every next node has at least one backward connection (no orphaned next nodes)
      nextNodes.forEach(nNode => {
        const hasIncoming = currentNodes.some(cNode => cNode.connections.includes(nNode.id));
        if (!hasIncoming) {
          // Connect closest current node to this next node
          const closestCurrent = [...currentNodes].sort((a, b) => 
            Math.abs(a.lane - nNode.lane) - Math.abs(b.lane - nNode.lane)
          )[0];
          closestCurrent.connections.push(nNode.id);
        }
      });
    }

    return map;
  }
}
