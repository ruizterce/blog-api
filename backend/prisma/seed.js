// prisma/seed.ts

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const author1 = await prisma.user.create({
    data: {
      username: "author1",
      email: "author1@example.com",
      password: "$2b$10$1xPqT.i.AO8TOtWVHHWVkuSEQwDSgkK3L/qC8MDWslSXioFhEAg0.",
      role: "AUTHOR",
    },
  });

  const author2 = await prisma.user.create({
    data: {
      username: "author2",
      email: "author2@example.com",
      password: "hashedpassword2",
      role: "AUTHOR",
    },
  });

  const author3 = await prisma.user.create({
    data: {
      username: "author3",
      email: "author3@example.com",
      password: "hashedpassword3",
      role: "AUTHOR",
    },
  });

  const visitor1 = await prisma.user.create({
    data: {
      username: "visitor1",
      email: "visitor1@example.com",
      password: "$2b$10$1xPqT.i.AO8TOtWVHHWVkuSEQwDSgkK3L/qC8MDWslSXioFhEAg0.",
      role: "VISITOR",
    },
  });

  const visitor2 = await prisma.user.create({
    data: {
      username: "visitor2",
      email: "visitor2@example.com",
      password: "hashedpassword4",
      role: "VISITOR",
    },
  });

  const visitor3 = await prisma.user.create({
    data: {
      username: "visitor3",
      email: "visitor3@example.com",
      password: "hashedpassword5",
      role: "VISITOR",
    },
  });

  // Create posts with comments and longer text content

  await prisma.post.create({
    data: {
      title: "First Post by Author 1",
      image: "/uploads/images/post1.jpg",
      text: `This is a detailed and comprehensive analysis on a relevant topic by Author 1. 
           The purpose of this article is to shed light on various aspects that often go unnoticed. 
           By exploring these areas, we aim to provide insights that will not only educate readers 
           but also spark discussions. Here, Author 1 dives into the nuances and challenges.`,
      status: "PUBLISHED",
      authorId: author1.id,
      comments: {
        create: [
          { text: "Great post with in-depth analysis!", userId: visitor1.id },
          {
            text: "This was very enlightening. Thank you!",
            userId: visitor2.id,
          },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Second Post by Author 1",
      image: "/uploads/images/post2.jpg",
      text: `In this unpublished piece, Author 1 tackles current trends and forecasts for the coming years. 
           A lot of thought has been put into exploring the potential outcomes and challenges associated 
           with these trends. Once published, this article is bound to gain traction and encourage readers 
           to consider long-term effects.`,
      status: "UNPUBLISHED",
      authorId: author1.id,
      comments: {
        create: [
          {
            text: "I’m excited to read this once it's published!",
            userId: visitor3.id,
          },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "An Extensive Analysis by Author 1",
      image: "/uploads/images/post3.jpg",
      text: `Author 1 presents a thorough breakdown of the subject at hand, addressing both fundamental 
           and advanced perspectives. This comprehensive approach allows readers of varying expertise 
           to gain something valuable. It’s not just a post; it’s a journey through insightful points 
           backed by examples, research, and thoughtful commentary.`,
      status: "PUBLISHED",
      authorId: author1.id,
      comments: {
        create: [
          { text: "The depth here is incredible!", userId: visitor1.id },
          {
            text: "Please keep writing such impactful articles!",
            userId: visitor2.id,
          },
          { text: "A masterpiece, thanks for sharing!", userId: visitor3.id },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Author 2's First Contribution",
      image: "/uploads/images/post4.jpg",
      text: `Author 2 shares an introductory article that covers essential ideas on trending topics. 
           This is the first of many insightful posts where Author 2 will bring a unique perspective. 
           Readers are encouraged to leave their feedback and share thoughts on this fresh viewpoint.`,
      status: "PUBLISHED",
      authorId: author2.id,
      comments: {
        create: [
          {
            text: "Looking forward to more from Author 2!",
            userId: visitor1.id,
          },
          { text: "Interesting read, very engaging!", userId: visitor3.id },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Explorative Piece by Author 2",
      image: "/uploads/images/post5.jpg",
      text: `Author 2 delves into several exploratory themes that are relevant in today's digital age. 
           While this piece remains unpublished, it provides a sneak peek into the areas Author 2 is 
           passionate about, especially topics that provoke thought and encourage curiosity.`,
      status: "UNPUBLISHED",
      authorId: author2.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Thoughts and Trends by Author 2",
      image: "/uploads/images/post6.jpg",
      text: `This article by Author 2 is a detailed assessment of current trends that have caught 
           the attention of industry experts. By sharing insights and recommendations, Author 2 
           hopes to bridge the knowledge gap and bring fresh ideas to readers.`,
      status: "PUBLISHED",
      authorId: author2.id,
      comments: {
        create: [
          { text: "Thanks for these great insights!", userId: visitor2.id },
          {
            text: "Very informative, please keep posting!",
            userId: visitor3.id,
          },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Insightful Journey by Author 3",
      image: "/uploads/images/post7.jpg",
      text: `In this fascinating post, Author 3 explores an array of topics that cater to a diverse 
           audience. Each point is well-researched and presented in an easily understandable format. 
           The article encourages readers to reflect on their own experiences and engage with the content.`,
      status: "PUBLISHED",
      authorId: author3.id,
      comments: {
        create: [
          { text: "A very thoughtful piece!", userId: visitor1.id },
          {
            text: "I learned a lot from this post, thank you.",
            userId: visitor2.id,
          },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Author 3's Unpublished Work",
      image: "/uploads/images/post8.jpg",
      text: `An unpublished yet promising work by Author 3. This post addresses certain social and 
           cultural topics in a way that is both respectful and informative. Once published, it is 
           expected to generate meaningful discussions and gather diverse opinions from readers.`,
      status: "UNPUBLISHED",
      authorId: author3.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Comprehensive Guide by Author 3",
      image: "/uploads/images/post9.jpg",
      text: `This guide by Author 3 covers an extensive range of information and provides clear, actionable 
           steps for readers. By the end of the article, readers will gain a complete understanding of 
           the topic, making it a valuable resource that can be referenced over time.`,
      status: "PUBLISHED",
      authorId: author3.id,
      comments: {
        create: [
          { text: "This guide is extremely helpful!", userId: visitor1.id },
          {
            text: "I appreciate the effort put into this, thanks!",
            userId: visitor3.id,
          },
        ],
      },
    },
  });

  console.log("Database has been seeded with mock data and local images");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
