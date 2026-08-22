import { seedSkills } from './seedSkills';
import { seedCourses } from './seedCourses';

const runSeeders = async () => {
  console.log('[Seeder] Initializing Firestore database seed pipeline...');
  
  // 1. Run Skills seed
  const skillIdMap = await seedSkills();

  // 2. Run Courses seed
  await seedCourses(skillIdMap);

  console.log('[Seeder] All database seed operations completed successfully.');
  process.exit(0);
};

runSeeders().catch((err) => {
  console.error('[Seeder] Critical database seeding failure:', err);
  process.exit(1);
});
