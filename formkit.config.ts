import { en } from "@formkit/i18n";
import { defineFormKitConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import theme from "./tailwind-theme.js";

export default defineFormKitConfig({
  locales: { en },
  locale: "en",
  icons: { ...genesisIcons },
  config: {
    classes: generateClasses(theme),
  },
});
