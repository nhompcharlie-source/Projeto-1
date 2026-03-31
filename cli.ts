import todo from './core.ts';
const command = process.argv[2];

if (command === "add") {
  const item = process.argv[3];
  const category = process.argv[4] || "Geral";
  
  if (!item) {
    console.error("Por favor, forneça um item para adicionar.");
    process.exit(1);
  }
  
  await todo.addItem(item, category);
  console.log(`Item "${item}" (Categoria: ${category}) adicionado com sucesso!`);
  process.exit(0);
}

if (command === "list") {
  const categoryFilter = process.argv[3];
  const items = await todo.getItems();
  
  if (items.length === 0) {
    console.log("Nenhum item na lista.");
    process.exit(0);
  }

  console.log("Lista de itens:");
  items.forEach((item, index) => {
    if (!categoryFilter || item.category === categoryFilter) {
      const status = item.completed ? "[X]" : "[ ]";
      console.log(`${index}: ${status} ${item.text}`);
      console.log(`   Categoria: ${item.category} | Criado em: ${item.createdAt} | Atualizado em: ${item.updatedAt}`);
    }
  });
  process.exit(0);
}

if (command === "update") {
  const index = parseInt(process.argv[3]);
  const newItem = process.argv[4];
  
  if (isNaN(index) || !newItem) {
    console.error("Por favor, forneça um indice valido e um novo item.");
    process.exit(1);
  }

  try {
    await todo.updateItem(index, newItem);
    console.log(`Item no indice ${index} atualizado para "${newItem}".`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}

if (command === "complete") {
  const index = parseInt(process.argv[3]);
  
  if (isNaN(index)) {
    console.error("Por favor, forneça um índice valido para concluir.");
    process.exit(1);
  }

  try {
    await todo.completeItem(index);
    console.log(`Item no índice ${index} marcado como conclui´do.`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}

if (command === "remove") {
  const index = parseInt(process.argv[3]);
  
  if (isNaN(index)) {
    console.error("Por favor, forneça um índice valido para remover.");
    process.exit(1);
  }
  
  try {
    await todo.removeItem(index);
    console.log(`Item no indice ${index} removido com sucesso.`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}

console.error("Comando desconhecido. Use 'add', 'list', 'update', 'complete' ou 'remove'.");
process.exit(1);