import { Context } from '@nuxt/types';
import { setRequestClient } from '~/helpers/api';

export default function({ $axios }: Context): void {
    setRequestClient($axios);
    $axios.setBaseURL(process.server ? 'http://varnish' : document.location.origin);
}
