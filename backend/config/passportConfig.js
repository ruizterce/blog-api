const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Local Strategy for username/password login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) return done(null, false, { message: "User not found" });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return done(null, false, { message: "Invalid credentials" });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// JWT Strategy for protected routes
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: jwtPayload.id },
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
          },
        });
        if (!user) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
