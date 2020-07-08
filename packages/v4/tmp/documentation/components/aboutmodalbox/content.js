
export default props => (
  <React.Fragment>
    <Component prop1="hi" />
<h2>{`Examples`}</h2>
<div>
<p>{`This is a non stripped.`}</p>
</div>
<Example {...{"code":"<div class=\"pf-c-about-modal-box\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"about-modal-title\">\n  <div class=\"pf-c-about-modal-box__brand\">\n    <img class=\"pf-c-about-modal-box__brand-image\" src=\"/assets/images/pf_mini_logo_white.svg\" alt=\"PatternFly brand logo\" />\n  </div>\n  <div class=\"pf-c-about-modal-box__close\">\n    <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Close dialog\">\n      <i class=\"fas fa-times\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n  <div class=\"pf-c-about-modal-box__header\">\n    <h1 class=\"pf-c-title pf-m-4xl\" id=\"about-modal-title\">Product name</h1>\n  </div>\n  <div class=\"pf-c-about-modal-box__hero\"></div>\n  <div class=\"pf-c-about-modal-box__content\">\n    <div class=\"pf-c-about-modal-box__body\">content</div>\n    <p class=\"pf-c-about-modal-box__strapline\">Trademark and copyright information here</p>\n  </div>\n</div>\n","lang":"html","isFullscreen":true,"thing1":"thing2"}}><p>{`Hey I'm a paragraph of text that describes the example and needs to be rendered somewhere special.`}</p><p>{`This is another paragraph of text that is the same thing.`}</p></Example>
<h2>{`Documentation`}</h2>
<h3>{`Accessibility`}</h3>
<table>
<thead>
<tr>
<th {...{"align":null}}>{`Attribute`}</th>
<th {...{"align":null}}>{`Applies to`}</th>
<th {...{"align":null}}>{`Outcome`}</th>
</tr>
</thead>
<tbody>
<tr>
<td {...{"align":null}}><code>{`role="dialog"`}</code></td>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box`}</code></td>
<td {...{"align":null}}>{`Identifies the element that serves as the modal container. `}<strong>{`Required`}</strong></td>
</tr>
<tr>
<td {...{"align":null}}><code>{`aria-labelledby="[id value of element describing modal]"`}</code></td>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box`}</code></td>
<td {...{"align":null}}>{`Gives the modal an accessible name by referring to the element that provides the dialog title. `}<strong>{`Required when adequate titling element is present`}</strong></td>
</tr>
<tr>
<td {...{"align":null}}><code>{`aria-label="[title of modal]"`}</code></td>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box`}</code></td>
<td {...{"align":null}}>{`Gives the modal an accessible name. `}<strong>{`Required when adequate titling element is `}<em>{`not`}</em>{` present`}</strong></td>
</tr>
<tr>
<td {...{"align":null}}><code>{`aria-describedby="[id value of applicable content]"`}</code></td>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box`}</code></td>
<td {...{"align":null}}>{`Gives the modal an accessible description by referring to the modal content that describes the primary message or purpose of the dialog. Not used if there is no static text that describes the modal.`}</td>
</tr>
<tr>
<td {...{"align":null}}><code>{`aria-modal="true"`}</code></td>
<td {...{"align":null}}><code>{`.pf-c-modal-box`}</code></td>
<td {...{"align":null}}>{`Tells assistive technologies that the windows underneath the current modal are not available for interaction. `}<strong>{`Required`}</strong></td>
</tr>
<tr>
<td {...{"align":null}}><code>{`aria-label="Close Dialog"`}</code></td>
<td {...{"align":null}}><code>{`.pf-c-modal-box__close .pf-c-button`}</code></td>
<td {...{"align":null}}>{`Provides an accessible name for the close button as it uses an icon instead of text. `}<strong>{`Required`}</strong></td>
</tr>
<tr>
<td {...{"align":null}}><code>{`aria-hidden="true"`}</code></td>
<td {...{"align":null}}>{`Parent element containing the page contents when the modal is open.`}</td>
<td {...{"align":null}}>{`Hides main contents of the page from screen readers. The element with `}<code>{`.pf-c-modal-box`}</code>{` must not be a descendent of the element with `}<code>{`aria-hidden="true"`}</code>{`. For more info see `}<a {...{"href":"/accessibility-guide#trapping-focus"}}>{`trapping focus`}</a>{` `}<strong>{`Required`}</strong></td>
</tr>
</tbody>
</table>
<h3>{`Usage`}</h3>
<table>
<thead>
<tr>
<th {...{"align":null}}>{`Class`}</th>
<th {...{"align":null}}>{`Applied to`}</th>
<th {...{"align":null}}>{`Outcome`}</th>
</tr>
</thead>
<tbody>
<tr>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box`}</code></td>
<td {...{"align":null}}><code>{`<div>`}</code>{`, `}<code>{`<article>`}</code></td>
<td {...{"align":null}}>{`Initiates a modal box.`}</td>
</tr>
<tr>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box__brand`}</code></td>
<td {...{"align":null}}><code>{`<div>`}</code></td>
<td {...{"align":null}}>{`Initiates a modal box brand cell.`}</td>
</tr>
<tr>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box__brand-image`}</code></td>
<td {...{"align":null}}><code>{`<img>`}</code></td>
<td {...{"align":null}}>{`Initiates a modal box brand image.`}</td>
</tr>
<tr>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box__close`}</code></td>
<td {...{"align":null}}><code>{`<div>`}</code></td>
<td {...{"align":null}}>{`Initiates a modal box close cell.`}</td>
</tr>
<tr>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box__header`}</code></td>
<td {...{"align":null}}><code>{`<div>`}</code>{`, `}<code>{`<header>`}</code></td>
<td {...{"align":null}}>{`Initiates a modal box header cell.`}</td>
</tr>
<tr>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box__hero`}</code></td>
<td {...{"align":null}}><code>{`<div>`}</code></td>
<td {...{"align":null}}>{`Initiates a modal box hero cell.`}</td>
</tr>
<tr>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box__content`}</code></td>
<td {...{"align":null}}><code>{`<div>`}</code></td>
<td {...{"align":null}}>{`Initiates a modal box content cell.`}</td>
</tr>
<tr>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box__body`}</code></td>
<td {...{"align":null}}><code>{`<div>`}</code></td>
<td {...{"align":null}}>{`Initiates a modal box body cell.`}</td>
</tr>
<tr>
<td {...{"align":null}}><code>{`.pf-c-about-modal-box__strapline`}</code></td>
<td {...{"align":null}}><code>{`<p>`}</code></td>
<td {...{"align":null}}>{`Initiates a modal box strapline cell.`}</td>
</tr>
</tbody>
</table>
  </React.Fragment>)