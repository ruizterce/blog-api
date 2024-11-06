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

  // Create posts with comments and local images
  await prisma.post.create({
    data: {
      title: "First Post by Author 1",
      image: "/uploads/images/post1.jpg",
      text: "This is the content of the first post.",
      status: "PUBLISHED",
      authorId: author1.id,
      comments: {
        create: [
          { text: "Great post!", userId: visitor1.id },
          { text: "Very insightful.", userId: visitor2.id },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Second Post by Author 1",
      image: "/uploads/images/post2.jpg",
      text: "Content for the second post.",
      status: "UNPUBLISHED",
      authorId: author1.id,
      comments: {
        create: [
          { text: "Excited to read when published!", userId: visitor3.id },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Third Post by Author 1",
      image: "/uploads/images/post3.jpg",
      text: "Another interesting post by Author 1.",
      status: "PUBLISHED",
      authorId: author1.id,
      comments: {
        create: [
          { text: "Love this!", userId: visitor1.id },
          { text: "Please keep writing!", userId: visitor2.id },
          { text: "Fantastic article!", userId: visitor3.id },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "First Post by Author 2",
      image: "/uploads/images/post4.jpg",
      text: "Content for the post by Author 2.",
      status: "PUBLISHED",
      authorId: author2.id,
      comments: {
        create: [
          { text: "Looking forward to more!", userId: visitor1.id },
          { text: "Interesting read, thanks!", userId: visitor3.id },
        ],
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Second Post by Author 2",
      image: "/uploads/images/post5.jpg",
      text: "An insightful post from Author 2.",
      status: "UNPUBLISHED",
      authorId: author2.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Third Post by Author 2",
      image: "/uploads/images/post6.jpg",
      text: "Another article by Author 2 on trending topics.",
      status: "PUBLISHED",
      authorId: author2.id,
      comments: {
        create: [
          { text: "Nice thoughts!", userId: visitor2.id },
          { text: "Thanks for sharing!", userId: visitor3.id },
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
