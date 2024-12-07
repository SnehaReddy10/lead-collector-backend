import {
  LeadSource,
  InteractionScore,
  InteractionType,
} from '../constants/enums';
import { Course } from '../models/course.model';
import { Interaction } from '../models/interaction.model';
import { Lead } from '../models/lead.model';
import { User } from '../models/user.model';
import { courses_seedData } from './courses';

export const seedData = async () => {
  try {
    console.log('Seeding data...');

    const user1 = await User.create({
      email: 'test1@gmail.com',
      password: 'password123',
      username: 'test1',
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      role: 'admin',
      userCategory: 'student',
      source: 'referral',
    });

    await Lead.create({
      userId: user1.id,
      email: user1.email,
      firstName: user1.firstName,
      lastName: user1.lastName,
      phone: user1.phone,
      userCategory: user1.userCategory,
      source: LeadSource.Referral,
      score: InteractionScore.SIGNUP,
    });

    const user2 = await User.create({
      email: 'test2@gmail.com',
      password: 'password456',
      username: 'test2',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '2345678901',
      role: 'user',
      userCategory: 'student',
      source: 'paid',
    });

    await Lead.create({
      userId: user2.id,
      email: user2.email,
      firstName: user2.firstName,
      lastName: user2.lastName,
      phone: user2.phone,
      userCategory: user2.userCategory,
      source: LeadSource.Paid,
      score: InteractionScore.SIGNUP,
    });

    const user3 = await User.create({
      email: 'test3@gmail.com',
      password: 'password789',
      username: 'test3',
      firstName: 'Michael',
      lastName: 'Johnson',
      phone: '3456789012',
      role: 'user',
      userCategory: 'professional',
      source: 'organic',
    });

    await Lead.create({
      userId: user3.id,
      email: user3.email,
      firstName: user3.firstName,
      lastName: user3.lastName,
      phone: user3.phone,
      userCategory: user3.userCategory,
      source: LeadSource.Organic,
      score: InteractionScore.SIGNUP,
    });

    const user4 = await User.create({
      email: 'test4@gmail.com',
      password: 'password101',
      username: 'test4',
      firstName: 'Emily',
      lastName: 'Davis',
      phone: '4567890123',
      role: 'admin',
      userCategory: 'student',
      source: 'referral',
    });

    await Lead.create({
      userId: user4.id,
      email: user4.email,
      firstName: user4.firstName,
      lastName: user4.lastName,
      phone: user4.phone,
      userCategory: user4.userCategory,
      source: LeadSource.Referral,
      score: InteractionScore.SIGNUP,
    });

    const user5 = await User.create({
      email: 'test5@gmail.com',
      password: 'password202',
      username: 'test5',
      firstName: 'David',
      lastName: 'Martinez',
      phone: '5678901234',
      role: 'user',
      userCategory: 'professional',
      source: 'paid',
    });

    await Lead.create({
      userId: user5.id,
      email: user5.email,
      firstName: user5.firstName,
      lastName: user5.lastName,
      phone: user5.phone,
      userCategory: user5.userCategory,
      source: LeadSource.Paid,
      score: InteractionScore.SIGNUP,
    });

    const user6 = await User.create({
      email: 'test6@gmail.com',
      password: 'password303',
      username: 'test6',
      firstName: 'Sarah',
      lastName: 'Garcia',
      phone: '6789012345',
      role: 'admin',
      userCategory: 'student',
      source: 'organic',
    });

    await Lead.create({
      userId: user6.id,
      email: user6.email,
      firstName: user6.firstName,
      lastName: user6.lastName,
      phone: user6.phone,
      userCategory: user6.userCategory,
      source: LeadSource.Organic,
      score: InteractionScore.SIGNUP,
    });

    const user7 = await User.create({
      email: 'test7@gmail.com',
      password: 'password404',
      username: 'test7',
      firstName: 'Chris',
      lastName: 'Lee',
      phone: '7890123456',
      role: 'user',
      userCategory: 'student',
      source: 'referral',
    });

    await Lead.create({
      userId: user7.id,
      email: user7.email,
      firstName: user7.firstName,
      lastName: user7.lastName,
      phone: user7.phone,
      userCategory: user7.userCategory,
      source: LeadSource.Referral,
      score: InteractionScore.SIGNUP,
    });

    const user8 = await User.create({
      email: 'test8@gmail.com',
      password: 'password505',
      username: 'test8',
      firstName: 'Laura',
      lastName: 'Lopez',
      phone: '8901234567',
      role: 'admin',
      userCategory: 'professional',
      source: 'paid',
    });

    await Lead.create({
      userId: user8.id,
      email: user8.email,
      firstName: user8.firstName,
      lastName: user8.lastName,
      phone: user8.phone,
      userCategory: user8.userCategory,
      source: LeadSource.Paid,
      score: InteractionScore.SIGNUP,
    });

    const user9 = await User.create({
      email: 'test9@gmail.com',
      password: 'password606',
      username: 'test9',
      firstName: 'Tom',
      lastName: 'Wilson',
      phone: '9012345678',
      role: 'user',
      userCategory: 'student',
      source: 'organic',
    });

    await Lead.create({
      userId: user9.id,
      email: user9.email,
      firstName: user9.firstName,
      lastName: user9.lastName,
      phone: user9.phone,
      userCategory: user9.userCategory,
      source: LeadSource.Organic,
      score: InteractionScore.SIGNUP,
    });

    const user10 = await User.create({
      email: 'test10@gmail.com',
      password: 'password707',
      username: 'test10',
      firstName: 'Linda',
      lastName: 'Miller',
      phone: '0123456789',
      role: 'admin',
      userCategory: 'professional',
      source: 'referral',
    });

    await Lead.create({
      userId: user10.id,
      email: user10.email,
      firstName: user10.firstName,
      lastName: user10.lastName,
      phone: user10.phone,
      userCategory: user10.userCategory,
      source: LeadSource.Referral,
      score: InteractionScore.SIGNUP,
    });

    courses_seedData.map(async (x) => {
      await Course.create({
        name: x.name,
        description: x.description,
        price: x.price,
        imageUrl: x.imageUrl,
        curriculum: x.curriculum,
      });
    });

    const leads = await Lead.findAll();
    const courses = await Course.findAll();

    const interactions = [
      {
        leadId: leads[0].id,
        interactionType: InteractionType.INTEREST_COURSE,
        courseId: courses[0].id,
        coursePurchased: null,
        score: InteractionScore.INTEREST_COURSE,
        date: new Date(),
      },
      {
        leadId: leads[0].id,
        interactionType: InteractionType.INTEREST_COURSE,
        courseId: courses[1].id,
        coursePurchased: null,
        score: InteractionScore.INTEREST_COURSE,
        date: new Date(),
      },
      {
        leadId: leads[2].id,
        interactionType: InteractionType.INTEREST_COURSE,
        courseId: courses[1].id,
        coursePurchased: null,
        score: InteractionScore.INTEREST_COURSE,
        date: new Date(),
      },
      {
        leadId: leads[3].id,
        interactionType: InteractionType.INTEREST_COURSE,
        courseId: courses[2].id,
        coursePurchased: null,
        score: InteractionScore.INTEREST_COURSE,
        date: new Date(),
      },
    ];

    for (let interactionData of interactions) {
      await Interaction.create(interactionData);
    }

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
  }
};
