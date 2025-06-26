export default defineNuxtPlugin(async () => {
  console.log('Initializing database...');
  
  try {
    const { getDatabase } = await import('~/utils/database');
    const db = getDatabase();
    await db.initTables();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
});
