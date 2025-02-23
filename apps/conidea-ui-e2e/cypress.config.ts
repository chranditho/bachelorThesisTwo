import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: nxE2EPreset(__dirname, {
    ciWebServerCommand: 'npx nx run conidea-ui:serve-static',
    webServerCommands: {
      default: 'npx nx run conidea-ui:serve:development',
      production: 'npx nx run conidea-ui:serve:production',
      ci: 'npx nx run conidea-ui:serve-static',
    },
  }),
});
