project-root/
│
├─ .github/            # Workflows de CI/CD
│
├─ playwright.config.ts  # Configuración principal (multi-entorno)
├─ tsconfig.json
│
├─ src/                # 💡 Lógica de framework (no se tocan los tests)
│  ├─ config/          # Configuración por entorno y constantes
│  │   ├─ env.ts       # Variables de entorno (baseURL, credenciales…)
│  │   ├─ testConfig.ts# Config común (por ejemplo timeouts y reporter)
│  │   └─ urls.ts      # Rutas de tu aplicación
│  │
│  ├─ core/            # Motor del framework
│  │   ├─ base/        # Clases base
│  │   │   ├─ BasePage.ts   # Métodos comunes a todas las páginas
│  │   │   ├─ BaseTest.ts   # Hooks y fixtures comunes
│  │   │   └─ BaseAPI.ts    # Si haces API testing
│  │   ├─ fixtures/    # Fixtures personalizados
│  │   │   └─ customFixtures.ts
│  │   └─ logger/      # Utilidad de logging para depuración
│  │       └─ logger.ts
│  │
│  ├─ pages/           # Page Objects y componentes reutilizables
│  │   ├─ MyAccountPage.ts
│  │   ├─ LoginPage.ts
│  │   ├─ …
│  │   └─ components/  # Componentes UI (sidebar, header, modals…)
│  │       ├─ Sidebar.ts
│  │       ├─ Header.ts
│  │       └─ …
│  │
│  ├─ api/             # Clientes y endpoints si pruebas APIs
│  │   ├─ clients/
│  │   └─ endpoints/
│  │
│  ├─ test-data/       # Datos estáticos y generadores de datos
│  │   ├─ users.json
│  │   └─ factories/
│  │
│  ├─ utils/           # Funciones puras (no dependen de Playwright)
│  │   ├─ dateUtils.ts
│  │   └─ randomUtils.ts
│  │
│  └─ types/           # Tipos TypeScript compartidos
│      └─ global.d.ts
│
└─ tests/              # ✅ Solo tests (sin selectores)
   ├─ ui/              # Tests de UI organizados por módulo
   │   ├─ myAccount.spec.ts
   │   ├─ login.spec.ts
   │   └─ …
   ├─ api/             # Tests de API (si los hay)
   └─ e2e/             # Casos end‑to‑end combinando UI y API