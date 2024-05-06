import { component$, useSignal } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';
import { Button } from '@qwik-ui/styled';
import { extractThemeCSS } from '@qwik-ui/utils';
import { LuX } from '@qwikest/icons/lucide';
import { useTheme } from 'qwik-themes';
import globalCSS from '~/global.css?raw';
import { Highlight } from '../highlight/highlight';

export default component$(() => {
  const showSig = useSignal(false);

  const cssThemeOutput = useSignal<string>('');

  const { theme } = useTheme();

  return (
    <>
      <Button
        onClick$={() => {
          cssThemeOutput.value = extractThemeCSS(
            theme === 'dark' || theme === 'light'
              ? 'border-radius-0 simple primary-cyan-600 light base-slate'
              : theme,
            globalCSS,
          );
          showSig.value = true;
        }}
      >
        Copy code
      </Button>
      <Modal.Root
        bind:show={showSig}
        class="my-animation h-[650px] max-w-2xl overflow-x-hidden rounded-base bg-background p-8 text-foreground shadow-md backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100"
      >
        <header>
          <h2 class="mb-2 text-lg font-bold">Copy config</h2>
          <p class="mb-6">
            Copy and paste the following code into your global.css file to apply the
            styles.
          </p>
        </header>
        <div>
          <Highlight code={cssThemeOutput.value} language="css" class="border" />
        </div>
        <button onClick$={() => (showSig.value = false)} class="absolute right-6 top-7">
          <LuX class="h-8 w-8" />
        </button>
      </Modal.Root>
    </>
  );
});
