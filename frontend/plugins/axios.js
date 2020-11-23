export default function({ $axios }) {
    $axios.setBaseURL(process.server ? 'http://varnish' : document.location.origin);
}
