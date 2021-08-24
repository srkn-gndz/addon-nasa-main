import { createAddon, runCli } from '@mediaurl/sdk';
import nasa from './nasa';

const nasaAddon = createAddon({
  id: 'nasa',
  name: 'Nasa Videos',
  version: '0.0.1',
  itemTypes: ['channel'],
  catalogs: [
    {
      features: {
        search: { enabled: true },
      },
      options: {
        imageShape: 'landscape',
        displayName: true,
      },
    },
  ],
  dashboards: [
    {
      id: '',
      name: 'Nasa Videos',
    },
  ],
});

nasaAddon.registerActionHandler('catalog', async (input, ctx) => {
  await ctx.requestCache([input.search, input.filter, input.cursor]);
  return await nasa.getVideos(input);
});

nasaAddon.registerActionHandler('item', async (input, ctx) => {
  return await nasa.getVideo(input);
});

// nasaAddon.registerActionHandler('source', async (input, ctx) => {
//   return [];
// });

runCli([nasaAddon], { singleMode: true });
