// // prisma/seed.ts
// import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('🌱 Iniciando seed...');

//   // Criar usuários admin
//   const hash1 = await bcrypt.hash('admin1', 10);
//   const hash2 = await bcrypt.hash('admin2', 10);

//   await prisma.user.upsert({
//     where: { username: 'admin1' },
//     update: {},
//     create: {
//       username: 'admin1',
//       passwordHash: hash1,
//       role: 'admin',
//     },
//   });

//   await prisma.user.upsert({
//     where: { username: 'admin2' },
//     update: {},
//     create: {
//       username: 'admin2',
//       passwordHash: hash2,
//       role: 'admin',
//     },
//   });

//   console.log('✅ Usuários criados');

//   // Criar conteúdo "Sobre Nós"
//   await prisma.aboutContent.upsert({
//     where: { section: 'intro' },
//     update: {},
//     create: {
//       section: 'intro',
//       content:
//         'A Associação Além da Visão (AAV) é uma organização dedicada à promoção da inclusão e acessibilidade para pessoas com deficiência visual.',
//     },
//   });

//   await prisma.aboutContent.upsert({
//     where: { section: 'mission' },
//     update: {},
//     create: {
//       section: 'mission',
//       content:
//         'Fundada com o propósito de criar um mundo mais acessível e igualitário, desenvolvemos programas e iniciativas que capacitam e empoderam nossa comunidade.',
//     },
//   });

//   await prisma.aboutContent.upsert({
//     where: { section: 'work' },
//     update: {},
//     create: {
//       section: 'work',
//       content:
//         'Nosso trabalho abrange desde workshops de tecnologia assistiva até campanhas de conscientização, sempre buscando derrubar barreiras e construir pontes para a inclusão social.',
//     },
//   });

//   await prisma.aboutContent.upsert({
//     where: { section: 'values' },
//     update: {},
//     create: {
//       section: 'values',
//       content:
//         'Acreditamos que a deficiência visual não define limites – ela apenas exige caminhos diferentes. E estamos aqui para trilhar esses caminhos juntos.',
//     },
//   });

//   console.log('✅ Conteúdo "Sobre Nós" criado');

//   // Criar links de redes sociais
//   await prisma.socialLink.upsert({
//     where: { platform: 'instagram' },
//     update: {},
//     create: {
//       platform: 'instagram',
//       url: 'https://instagram.com/alemdavisao',
//       displayName: 'Instagram',
//       icon: 'Instagram',
//       position: 1,
//     },
//   });

//   await prisma.socialLink.upsert({
//     where: { platform: 'facebook' },
//     update: {},
//     create: {
//       platform: 'facebook',
//       url: 'https://facebook.com/alemdavisao',
//       displayName: 'Facebook',
//       icon: 'Facebook',
//       position: 2,
//     },
//   });

//   await prisma.socialLink.upsert({
//     where: { platform: 'youtube' },
//     update: {},
//     create: {
//       platform: 'youtube',
//       url: 'https://youtube.com/@alemdavisao',
//       displayName: 'YouTube',
//       icon: 'Youtube',
//       position: 3,
//     },
//   });

//   await prisma.socialLink.upsert({
//     where: { platform: 'email' },
//     update: {},
//     create: {
//       platform: 'email',
//       url: 'mailto:contato@alemdavisao.org',
//       displayName: 'E-mail',
//       icon: 'Mail',
//       position: 4,
//     },
//   });

//   console.log('✅ Links de redes sociais criados');

//   // Criar configurações do site
//   const settings = [
//     { key: 'site_title', value: 'Associação Além da Visão', type: 'text' },
//     {
//       key: 'site_subtitle',
//       value: 'Construindo um mundo mais acessível e inclusivo',
//       type: 'text',
//     },
//     { key: 'vakinha_link', value: 'https://vaka.me/alemdavisao', type: 'url' },
//     { key: 'contact_phone', value: '(41) 9999-9999', type: 'text' },
//     { key: 'contact_email', value: 'contato@alemdavisao.org', type: 'email' },
//     {
//       key: 'contact_address',
//       value:
//         'Rua Exemplo, 123 - Centro\nSão José dos Pinhais - PR\nCEP: 00000-000',
//       type: 'textarea',
//     },
//   ];

//   for (const setting of settings) {
//     await prisma.siteSetting.upsert({
//       where: { settingKey: setting.key },
//       update: {},
//       create: {
//         settingKey: setting.key,
//         settingValue: setting.value,
//         settingType: setting.type,
//       },
//     });
//   }

//   console.log('✅ Configurações do site criadas');
//   console.log('🎉 Seed concluído com sucesso!');
// }

// main()
//   .catch((e) => {
//     console.error('❌ Erro no seed:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
