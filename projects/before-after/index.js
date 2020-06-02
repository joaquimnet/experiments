document.body.addEventListener('click', (e) => {
  const tooltipLinkAttribute = e.target.attributes['data-tool-tip-link'];
  if (!tooltipLinkAttribute) return;

  const url = tooltipLinkAttribute.value;

  if (url === 'false') {
    e.preventDefault();
    return;
  }
  window.open(url, '_blank');
});
