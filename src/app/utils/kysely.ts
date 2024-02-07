import {
  QueryResult,
  KyselyPlugin,
  OperationNodeTransformer,
  PluginTransformQueryArgs,
  PluginTransformResultArgs,
  PrimitiveValueListNode,
  RootOperationNode,
  UnknownRow,
  ValueNode,
} from "kysely";

interface Point {
  x: number;
  y: number;
}

function mapPoint(point: Point): string {
  return `(${point.x}, ${point.y})`;
}

function isPoint(point: unknown): point is Point {
  return typeof point === "object" && !!point && "x" in point && "y" in point;
}

class PointTransformer extends OperationNodeTransformer {
  protected transformValue(node: ValueNode): ValueNode {
    return {
      ...node,
      value: isPoint(node.value) ? mapPoint(node.value) : node.value,
    };
  }

  protected transformPrimitiveValueList(
    node: PrimitiveValueListNode
  ): PrimitiveValueListNode {
    return {
      ...node,
      values: node.values.map((it) => (isPoint(it) ? mapPoint(it) : it)),
    };
  }
}

export class PointPlugin implements KyselyPlugin {
  readonly #transformer = new PointTransformer();

  transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
    return this.#transformer.transformNode(args.node);
  }

  transformResult(
    args: PluginTransformResultArgs
  ): Promise<QueryResult<UnknownRow>> {
    return Promise.resolve(args.result);
  }
}
