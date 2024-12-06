try {
    require('pg');
    console.log('pg package is installed correctly.');
  } catch (error) {
    console.error('pg package is missing:', error);
  }
  