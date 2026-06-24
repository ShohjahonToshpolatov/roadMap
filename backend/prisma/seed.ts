// backend/prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.roadmap.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Demo User',
      email: 'demo@mindwizard.ai',
      password: hashedPassword,
    },
  });
  console.log(`✅ User created: ${user.email}`);

  // Create quizzes
  const anxietyQuiz = await prisma.quiz.create({
    data: {
      title: 'Anxiety Level Assessment',
      category: 'anxiety',
      description: 'Evaluate your current anxiety levels and identify patterns in your emotional responses.',
    },
  });

  const depressionQuiz = await prisma.quiz.create({
    data: {
      title: 'Depression Screening',
      category: 'depression',
      description: 'Assess symptoms of depression and understand your emotional well-being.',
    },
  });

  const stressQuiz = await prisma.quiz.create({
    data: {
      title: 'Stress Management Quiz',
      category: 'stress',
      description: 'Measure your stress levels and discover effective coping strategies.',
    },
  });

  const mindfulnessQuiz = await prisma.quiz.create({
    data: {
      title: 'Mindfulness & Self-Awareness',
      category: 'mindfulness',
      description: 'Explore your mindfulness practices and self-awareness levels.',
    },
  });

  const emotionalIntelligenceQuiz = await prisma.quiz.create({
    data: {
      title: 'Emotional Intelligence Test',
      category: 'emotional-intelligence',
      description: 'Evaluate your emotional intelligence and interpersonal skills.',
    },
  });

  console.log('✅ Quizzes created');

  // Create questions for Anxiety Quiz
  await prisma.question.createMany({
    data: [
      {
        quizId: anxietyQuiz.id,
        questionText: 'How often do you feel nervous or anxious?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        correctOption: 'Several days',
        topic: 'anxiety',
      },
      {
        quizId: anxietyQuiz.id,
        questionText: 'How often do you have trouble relaxing?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        correctOption: 'Several days',
        topic: 'anxiety',
      },
      {
        quizId: anxietyQuiz.id,
        questionText: 'How often do you worry too much about different things?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        correctOption: 'Several days',
        topic: 'anxiety',
      },
      {
        quizId: anxietyQuiz.id,
        questionText: 'How often do you have trouble controlling your worry?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        correctOption: 'Several days',
        topic: 'anxiety',
      },
      {
        quizId: anxietyQuiz.id,
        questionText: 'How often do you feel restless or on edge?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        correctOption: 'Several days',
        topic: 'anxiety',
      },
    ],
  });

  // Create questions for Depression Quiz
  await prisma.question.createMany({
    data: [
      {
        quizId: depressionQuiz.id,
        questionText: 'How often have you felt little interest or pleasure in doing things?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        correctOption: 'Several days',
        topic: 'depression',
      },
      {
        quizId: depressionQuiz.id,
        questionText: 'How often have you felt down, depressed, or hopeless?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        correctOption: 'Several days',
        topic: 'depression',
      },
      {
        quizId: depressionQuiz.id,
        questionText: 'How often have you had trouble falling or staying asleep?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        correctOption: 'Several days',
        topic: 'depression',
      },
      {
        quizId: depressionQuiz.id,
        questionText: 'How often have you felt tired or had little energy?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        correctOption: 'Several days',
        topic: 'depression',
      },
      {
        quizId: depressionQuiz.id,
        questionText: 'How often have you had poor appetite or overeating?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        correctOption: 'Several days',
        topic: 'depression',
      },
    ],
  });

  // Create questions for Stress Quiz
  await prisma.question.createMany({
    data: [
      {
        quizId: stressQuiz.id,
        questionText: 'How often do you feel overwhelmed by your responsibilities?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
        correctOption: 'Sometimes',
        topic: 'stress',
      },
      {
        quizId: stressQuiz.id,
        questionText: 'How often do you have difficulty concentrating due to stress?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
        correctOption: 'Sometimes',
        topic: 'stress',
      },
      {
        quizId: stressQuiz.id,
        questionText: 'How often do you experience physical symptoms of stress (headaches, tension)?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
        correctOption: 'Sometimes',
        topic: 'stress',
      },
      {
        quizId: stressQuiz.id,
        questionText: 'How often do you feel you cannot cope with all the things you have to do?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
        correctOption: 'Sometimes',
        topic: 'stress',
      },
      {
        quizId: stressQuiz.id,
        questionText: 'How often do you feel irritable or angry due to stress?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
        correctOption: 'Sometimes',
        topic: 'stress',
      },
    ],
  });

  // Create questions for Mindfulness Quiz
  await prisma.question.createMany({
    data: [
      {
        quizId: mindfulnessQuiz.id,
        questionText: 'How often do you find yourself living in the present moment?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
        correctOption: 'Sometimes',
        topic: 'mindfulness',
      },
      {
        quizId: mindfulnessQuiz.id,
        questionText: 'How often do you notice your thoughts without judging them?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
        correctOption: 'Sometimes',
        topic: 'mindfulness',
      },
      {
        quizId: mindfulnessQuiz.id,
        questionText: 'How often do you practice deep breathing or meditation?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
        correctOption: 'Sometimes',
        topic: 'mindfulness',
      },
      {
        quizId: mindfulnessQuiz.id,
        questionText: 'How aware are you of your emotional reactions in difficult situations?',
        options: ['Not aware', 'Slightly aware', 'Moderately aware', 'Very aware', 'Extremely aware'],
        correctOption: 'Moderately aware',
        topic: 'mindfulness',
      },
      {
        quizId: mindfulnessQuiz.id,
        questionText: 'How often do you take time to appreciate simple things in life?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
        correctOption: 'Sometimes',
        topic: 'mindfulness',
      },
    ],
  });

  // Create questions for Emotional Intelligence Quiz
  await prisma.question.createMany({
    data: [
      {
        quizId: emotionalIntelligenceQuiz.id,
        questionText: 'How well do you understand your own emotions?',
        options: ['Not well', 'Slightly well', 'Moderately well', 'Very well', 'Extremely well'],
        correctOption: 'Moderately well',
        topic: 'emotional-intelligence',
      },
      {
        quizId: emotionalIntelligenceQuiz.id,
        questionText: 'How well do you manage your emotions in stressful situations?',
        options: ['Not well', 'Slightly well', 'Moderately well', 'Very well', 'Extremely well'],
        correctOption: 'Moderately well',
        topic: 'emotional-intelligence',
      },
      {
        quizId: emotionalIntelligenceQuiz.id,
        questionText: 'How well do you understand other people\'s emotions?',
        options: ['Not well', 'Slightly well', 'Moderately well', 'Very well', 'Extremely well'],
        correctOption: 'Moderately well',
        topic: 'emotional-intelligence',
      },
      {
        quizId: emotionalIntelligenceQuiz.id,
        questionText: 'How well do you build and maintain relationships?',
        options: ['Not well', 'Slightly well', 'Moderately well', 'Very well', 'Extremely well'],
        correctOption: 'Moderately well',
        topic: 'emotional-intelligence',
      },
      {
        quizId: emotionalIntelligenceQuiz.id,
        questionText: 'How well do you use emotions to facilitate thinking and problem-solving?',
        options: ['Not well', 'Slightly well', 'Moderately well', 'Very well', 'Extremely well'],
        correctOption: 'Moderately well',
        topic: 'emotional-intelligence',
      },
    ],
  });

  console.log('✅ Questions created');

  // Create demo roadmap
  await prisma.roadmap.create({
    data: {
      userId: user.id,
      category: 'anxiety',
      stepsData: [
        { step: 1, title: 'Assessment', description: 'Complete anxiety level assessment quiz', completed: true },
        { step: 2, title: 'Awareness', description: 'Identify your anxiety triggers and patterns', completed: false },
        { step: 3, title: 'Breathing Techniques', description: 'Learn deep breathing exercises for calmness', completed: false },
        { step: 4, title: 'Cognitive Restructuring', description: 'Challenge and reframe anxious thoughts', completed: false },
        { step: 5, title: 'Maintenance', description: 'Build long-term anxiety management habits', completed: false },
      ],
    },
  });

  console.log('✅ Roadmap created');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });