interface TodoItem {
  text: string;
  category: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const filename = __dirname + '/data.todo.json';
let list: TodoItem[] = null!;

async function loadFromFile() {
  if (list !== null)
    return;
  try {
    const file = Bun.file(filename);
    const content = await file.text();
    list = JSON.parse(content) as TodoItem[];
  } catch (error) {
    Bun.write(filename, "[]");
    list = [];
  }
}

async function saveToFile() {
  await Bun.write(filename, JSON.stringify(list, null, 2));
}

export async function addItem(text: string, category: string = "Geral") {
  await loadFromFile();
  const now = new Date().toLocaleString();
  list.push({
    text,
    category,
    completed: false,
    createdAt: now,
    updatedAt: now
  });
  await saveToFile();
}

export async function getItems() {
  await loadFromFile();
  return list;
}

export async function updateItem(index: number, newText: string) {
  await loadFromFile();
  if (index < 0 || index >= list.length)
    throw new Error("indice fora dos limites");
  list[index].text = newText;
  list[index].updatedAt = new Date().toLocaleString();
  await saveToFile();
}

export async function completeItem(index: number) {
  await loadFromFile();
  if (index < 0 || index >= list.length)
    throw new Error("indice fora dos limites");
  list[index].completed = true;
  list[index].updatedAt = new Date().toLocaleString();
  await saveToFile();
}

export async function removeItem(index: number) {
  await loadFromFile();
  if (index < 0 || index >= list.length)
    throw new Error("indice fora dos limites");
  list.splice(index, 1);
  await saveToFile();
}

export default { addItem, getItems, updateItem, completeItem, removeItem };