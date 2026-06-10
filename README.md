# HW 11: Chain of Responsibility & Mediator (Ланцюжок відповідальностей та Посередник)

Цей проєкт демонструє використання поведінкових патернів Ланцюжок відповідальностей (Chain of Responsibility) та Посередник (Mediator) на прикладах з практичного TypeScript-контексту для валідації, обробки та збереження структурованих записів різних типів.

## Запуск та демонстрація

Встановлення залежностей:

```bash
npm install
```

Запуск обробки записів:

```bash
npx ts-node src/main.ts
```

Приклад збірки проєкту:

```bash
npm run build
```

## Як додати новий тип запису

1. **Оновіть модель**: Додайте новий тип та його інтерфейс до об'єднання `DataRecord` у [DataRecord.ts](file:///Users/veronikagalliamova/Study/design%20patterns/neo-design-patterns-hw-11/src/models/DataRecord.ts).
2. **Створіть обробники та ланцюг**: Створіть специфічні обробники в [handlers/](file:///Users/veronikagalliamova/Study/design%20patterns/neo-design-patterns-hw-11/src/chain/handlers/), об'єднайте їх у новий ланцюг у [chains/](file:///Users/veronikagalliamova/Study/design%20patterns/neo-design-patterns-hw-11/src/chain/chains/) та зареєструйте у `handlerMap` в [main.ts](file:///Users/veronikagalliamova/Study/design%20patterns/neo-design-patterns-hw-11/src/main.ts).
3. **Створіть Writer та зареєструйте в Mediator**: Створіть новий клас-письменник у [writers/](file:///Users/veronikagalliamova/Study/design%20patterns/neo-design-patterns-hw-11/src/mediator/writers/) та підключіть його у [ProcessingMediator.ts](file:///Users/veronikagalliamova/Study/design%20patterns/neo-design-patterns-hw-11/src/mediator/ProcessingMediator.ts) (зареєструйте в полях класу, а також оновіть методи `onSuccess` та `finalize`).