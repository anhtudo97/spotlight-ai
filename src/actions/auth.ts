'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function onAuthenticateUser() {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
      };
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });

    if (userExists) {
      return {
        status: 200,
        user: userExists,
      };
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        profileImage: user.imageUrl,
      },
    });

    if (!newUser) {
      return {
        status: 500,
        message: 'Fail to create user',
      };
    }

    return {
      status: 201,
      user: newUser,
    };
  } catch (error) {
    console.log('Error on AUTH', error);
    return {
      status: 500,
      message: 'Internal Server Error',
    };
  }
}
