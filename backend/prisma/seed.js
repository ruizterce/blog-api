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
      status: "PUBLISHED",
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

  await prisma.post.create({
    data: {
      title: "The Future of AI by Author 1",
      image: "/uploads/images/post10.jpg",
      text: `In this post, Author 1 delves into the exciting and ever-evolving field of Artificial Intelligence. 
            The article explores its current applications, future potential, and the ethical considerations that 
            will shape the development of AI technologies over the next decade.`,
      status: "PUBLISHED",
      authorId: author1.id,
      comments: {
        create: [
          {
            text: "Amazing insights! Looking forward to more on AI.",
            userId: visitor1.id,
          },
          {
            text: "This was a great read, thanks for sharing!",
            userId: visitor2.id,
          },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "New Frontiers in Space Exploration by Author 3",
      image: "/uploads/images/post11.jpg",
      text: `Author 3 provides a deep dive into the exciting new frontiers of space exploration. 
            This article highlights the latest missions, breakthroughs in technology, and what the future holds for humanity’s 
            journey beyond our planet. The possibilities are endless, and Author 3 presents a compelling case for why we should 
            keep pushing the boundaries.`,
      status: "PUBLISHED",
      authorId: author3.id,
      comments: {
        create: [
          {
            text: "Incredible article! Space exploration is the future.",
            userId: visitor1.id,
          },
          {
            text: "I loved the perspective on future missions. Very exciting!",
            userId: visitor3.id,
          },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Exploring the Metaverse by Author 2",
      image: "/uploads/images/post12.jpg",
      text: `Author 2 explores the concept of the Metaverse, a digital universe where people interact, work, and play. 
            This post breaks down the elements that make up the Metaverse, its potential impact on various industries, and 
            the challenges that still need to be addressed before it becomes a fully realized virtual world.`,
      status: "PUBLISHED",
      authorId: author2.id,
      comments: {
        create: [
          {
            text: "The Metaverse is so fascinating. Great breakdown!",
            userId: visitor2.id,
          },
          {
            text: "I agree, the potential for this is huge. Can’t wait to see more.",
            userId: visitor1.id,
          },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Digital Privacy in 2024 by Author 1",
      text: `As digital technology continues to advance, so does the issue of privacy. Author 1 takes a close look at the 
            state of digital privacy in 2024, exploring current trends in data protection, potential risks, and best practices 
            for maintaining privacy in the increasingly connected world.`,
      status: "UNPUBLISHED",
      authorId: author1.id,
      comments: {
        create: [
          {
            text: "So relevant! Privacy is definitely a big concern nowadays.",
            userId: visitor3.id,
          },
          {
            text: "Great post, definitely need more awareness about digital privacy.",
            userId: visitor1.id,
          },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "The Rise of Remote Work by Author 2",
      image: "/uploads/images/post11.jpg",
      text: `With the ongoing shifts in the workforce, Author 2 discusses the rapid rise of remote work and how companies 
            are adapting to a decentralized model. This post covers both the pros and cons of remote work, as well as the 
            long-term implications for the workplace culture and work-life balance.`,
      status: "UNPUBLISHED",
      authorId: author2.id,
      comments: {
        create: [
          {
            text: "Remote work is the future. Loved this article!",
            userId: visitor2.id,
          },
          {
            text: "Thanks for sharing these insights. Very informative.",
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
