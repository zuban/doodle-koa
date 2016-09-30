// Основные тесты, прогоняемые перед каждым коммитом
// В их состав входят наиболее критичные тесты базовых модулей

// Redux модули
let reduxContext = require.context('./src/redux/modules/__test__', true, /-test.js$/);
reduxContext.keys().forEach(reduxContext);
