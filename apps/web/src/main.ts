import { Attributes, Node, Context, Block, Document } from '@editor/doc';




const document1 = new Document();

const block1 = new Block('h1');

const text1 = new Node('text', 'Заголовок на подумать!');

const block_p_1 = new Block('p');

const word1_p_1 = new Node('word', 'Это');

const word2_p_2 = new Node('word', 'обычные');

const word3_p_3 = new Node('word', 'слова');

block1.attach(text1);
block1.attach(block_p_1)
block_p_1.attach(word1_p_1)
block_p_1.attach(word2_p_2)
block_p_1.attach(word3_p_3)
document1._order.push(block1.id)
document1._order.push(text1.id)
document1._order.push(block_p_1.id)
document1._order.push(word1_p_1.id)
document1._order.push(word2_p_2.id)
document1._order.push(word3_p_3.id)

const order = document1.order;

console.log(document1);

console.log(JSON.stringify(document1))

console.log(JSON.stringify(order));
