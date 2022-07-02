/**
 * Created by xun on  2021/8/23 16:07.
 * description: common.d
 */
interface IObject {
  [key: string]: any;
}

interface IAntdOption extends IObject {
  value: string | number | boolean;
  label: string;
}

interface ITreeOption extends IAntdOption {
  children?: IAntdOption[];
  // 标记是否为叶子节点，设置了 `loadData` 时有效
  // 设为 `false` 时会强制标记为父节点，即使当前节点没有 children，也会显示展开图标
  isLeaf?: boolean;
  disabled?: boolean;
}
interface ITreeNode extends IObject {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: ITreeNode[];
}
