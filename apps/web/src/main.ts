import { Node, Document, documentToJSON } from '@editor/doc';




// const document1 = new Document();

// const block1 = new Block('h1');

// const text1 = new Node('text', 'Заголовок на подумать!');

// const block_p_1 = new Block('p');

// const word1_p_1 = new Node('word', 'Это');

// const word2_p_2 = new Node('word', 'обычные');

// const word3_p_3 = new Node('word', 'слова');

// block1.attach(text1);
// block1.attach(block_p_1)
// block_p_1.attach(word1_p_1)
// block_p_1.attach(word2_p_2)
// block_p_1.attach(word3_p_3)
// document1._order.push(block1.id)
// document1._order.push(text1.id)
// document1._order.push(block_p_1.id)
// document1._order.push(word1_p_1.id)
// document1._order.push(word2_p_2.id)
// document1._order.push(word3_p_3.id)

// const order = document1.order;

// console.log(document1);

// console.log(JSON.stringify(document1))

// console.log(JSON.stringify(order));
// import { renderNode } from './adapter_html'; // твой рендерер Node -> HTMLElement

const root = document.getElementById('root')!;

// создаём общий документ
const doc = new Document();

// ---- HEADER ----
const header = doc.createBlock('heading');

// текст внутри заголовка
const header_text = doc.createNode('text', 'Заголовок на подумать!');
header.append(header_text); // append через Node, автоматически выставляет parent

// ---- WORDS ----
const word1 = doc.createNode('word', 'Заголовок');
const word2 = doc.createNode('word', 'на');
const word3 = doc.createNode('word', 'подумать');

// добавляем слова в header_text
header_text.append(word1);
header_text.append(word2);
header_text.append(word3);

// ---- MORPHEMS ----
const morphem1_1 = doc.createNode('morphem', 'За');
morphem1_1.attributes.style = { color: 'green' };

const morphem1_2 = doc.createNode('morphem', 'гол');
const morphem1_3 = doc.createNode('morphem', 'ов');
const morphem1_4 = doc.createNode('morphem', 'ок');

// добавляем морфемы в word1
word1.append(morphem1_1);
word1.append(morphem1_2);
word1.append(morphem1_3);
word1.append(morphem1_4);

// ---- ЛОГИ ----
console.log(header);
console.log(word1);
console.log('---its morphems---');
word1.children.forEach(node => console.log(node));
console.log('----other words----');
console.log(word2);
console.log(word3);

const json = documentToJSON(doc);
console.log(JSON.stringify(json, null, 2));

console.log(word1.context)
console.log(JSON.stringify(json, null, 2).length)
const json1 = documentToJSON(doc); // твоя функция сериализации
const str = JSON.stringify(json1);
console.log('Размер JSON в байтах:', new TextEncoder().encode(str).length);

console.log(doc)