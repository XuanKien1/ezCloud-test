import { CLASS_LIST } from '../constants/classes';
export function sortByClassOrder(a, b) {
  return CLASS_LIST.indexOf(a.class) - CLASS_LIST.indexOf(b.class);
}
