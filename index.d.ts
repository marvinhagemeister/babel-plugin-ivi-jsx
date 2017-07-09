import {
  HTMLAnchorElementProps,
  HTMLAreaElementProps,
  HTMLAudioElementProps,
  HTMLBaseElementProps,
  HTMLBodyElementProps,
  HTMLButtonElementProps,
  HTMLCanvasElementProps,
  HTMLDataListElementProps,
  HTMLEmbedElementProps,
  HTMLElementProps,
  HTMLFieldSetElementProps,
  HTMLFormElementProps,
  HTMLHeadingElementProps,
  HTMLHtmlElementProps,
  HTMLIFrameElementProps,
  HTMLImageElementProps,
  HTMLInputElementProps,
  HTMLLabelElementProps,
  HTMLLIElementProps,
  HTMLLinkElementProps,
  HTMLMapElementProps,
  HTMLMenuElementProps,
  HTMLMetaElementProps,
  HTMLMeterElementProps,
  HTMLObjectElementProps,
  HTMLOListElementProps,
  HTMLOptGroupElementProps,
  HTMLOptionElementProps,
  HTMLParamElementProps,
  HTMLParagraphElementProps,
  HTMLProgressElementProps,
  HTMLQuoteElementProps,
  HTMLScriptElementProps,
  HTMLSelectElementProps,
  HTMLSourceElementProps,
  HTMLStyleElementProps,
  HTMLTableDataCellElementProps,
  HTMLTextAreaElementProps,
  HTMLTableHeaderCellElementProps,
  HTMLTitleElementProps,
  HTMLTrackElementProps,
  HTMLVideoElementProps,
} from "ivi-core";

/* tslint:disable */

declare global {
  namespace JSX {
    interface Element {
      props: any;
      type: any;
    }

    interface ElementAttributesProperty {
      props: any;
    }

    interface ElementChildrenAttribute {
      children: {};
    }

    interface IntrinsicElements {
      /**
       * Creates a hyperlink to other web pages, files, locations within the
       * same page, email addresses, or any other URL.
       */
      a: HTMLAnchorElementProps;
      /**
       * Represents an abbreviation and optionally provides a full description
       * for it. If present, the title attribute must contain this full
       * description and nothing else.
       */
      abbr: HTMLElementProps;
      /**
       * Supplies contact information for its nearest <article> or <body>
       * ancestor; in the latter case, it applies to the whole document.
       */
      address: HTMLElementProps;
      /**
       * Defines a hot-spot region on an image, and optionally associates it
       * with a hypertext link. This element is used only within a `<map>`
       * element.
       */
      area: HTMLAreaElementProps;
      /**
       * Represents a self-contained composition in a document, page,
       * application, or site, which is intended to be independently
       * distributable or reusable (e.g., in syndication).
       */
      article: HTMLElementProps;
      /**
       * Represents a section of the page with content connected tangentially
       * to the rest, which could be considered separate from that content.
       */
      aside: HTMLElementProps;
      /** Used to embed sound content in documents. */
      audio: HTMLAudioElementProps;
      /**
       * Represents a span of text stylistically different from normal text,
       * without conveying any special importance or relevance. It is typically
       * used for keywords in a summary, product names in a review, or other
       * spans of text whose typical presentation would be boldfaced.
       */
      b: HTMLElementProps;
      /**
       * Specifies the base URL to use for all relative URLs contained within a
       * document. There can be only one <base> element in a document.
       */
      base: HTMLBaseElementProps;
      /**
       * Isolates a span of text that might be formatted in a different
       * direction from other text outside it. This element is useful when
       * embedding text with an unknown directionality, from a database for
       * example, inside text with a fixed directionality.
       */
      bdi: HTMLElementProps;
      /** Used to override the current directionality of text. */
      bdo: HTMLElementProps;
      /** Indicates that the enclosed text is an extended quotation. */
      blockquote: HTMLQuoteElementProps;
      /**
       * Represents the content of an HTML document. There can be only one
       * `<body>` element in a document.
       */
      body: HTMLBodyElementProps;
      /**
       * Produces a line break in text (carriage-return). It is useful for
       * writing a poem or an address, where the division of lines is
       * significant.
       */
      br: HTMLElementProps;
      /** Represents a clickable button. */
      button: HTMLButtonElementProps;
      /**
       * Used to draw graphics via scripting (usually JavaScript). For example,
       * it can be used to draw graphs, make photo compositions or even perform
       * animations.
       */
      canvas: HTMLCanvasElementProps;
      /**
       * Represents the title of a table. It is always the first descendant of
       * a `<table>`.
       */
      caption: HTMLElementProps;
      /**
       * Represents a reference to a creative work. It must include the title of
       * a work or a URL reference.
       */
      cite: HTMLElementProps;
      /**
       * Represents a fragment of computer code. By default, it is displayed in
       * the browser's default monospace font.
       */
      code: HTMLElementProps;
      /**
       * Defines a column within a table and is used for defining common
       * semantics on all common cells. It is generally found within a
       * `<colgroup>` element.
       */
      col: HTMLElementProps;
      /** Defines a group of columns within a table. */
      colgroup: HTMLElementProps;
      /**
       * Links a given content with a machine-readable translation. If the
       * content is time- or date-related, the `<time>` must be used.
       */
      data: HTMLElementProps;
      /**
       * Contains a set of `<option>` elements that represent the values
       * available for other controls.
       */
      datalist: HTMLDataListElementProps;
      /** Indicates the description of a term in a description list `<dl>`. */
      dd: HTMLElementProps;
      /**
       * Represents a range of text that has been deleted from a document. This
       * element is often (but need not be) rendered with strike-through text.
       */
      del: HTMLElementProps;
      /**
       * Used as a disclosure widget from which the user can retrieve additional
       * information.
       */
      details: HTMLElementProps;
      /** Represents the defining instance of a term. */
      dfn: HTMLElementProps;
      /**
       * Generic container for flow content, which does not inherently
       * represent anything.
       */
      div: HTMLElementProps;
      /**
       * Encloses a list of groups of terms and descriptions. Common uses for
       * this element are to implement a glossary or to display metadata (a list
       * of key-value pairs).
       */
      dl: HTMLElementProps;
      /**
       * Identifies a term in a description list. This element can occur only as
       * a child element of a `<dl>`.
       */
      dt: HTMLElementProps;
      /** Marks text that has greater emphasis. */
      em: HTMLElementProps;
      /**
       * Represents an integration point for an external application or
       * interactive content (in other words, a plug-in).
       */
      embed: HTMLEmbedElementProps;
      /**
       * Used to group several controls as well as labels (`<label>`) within a
       * web form.
       */
      fieldset: HTMLFieldSetElementProps;
      /**
       * Represents a caption or a legend associated with a `<figure>` or an
       * illustration.
       */
      figcaption: HTMLElementProps;
      /**
       * Represents self-contained content, frequently with a `<figcaption>`.
       */
      figure: HTMLElementProps;
      /**
       * Represents a footer for its nearest sectioning content or sectioning
       * root element.
       */
      footer: HTMLElementProps;
      /**
       * Represents a document section that contains interactive controls to
       * submit information to a web server.
       */
      form: HTMLFormElementProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h1: HTMLElementProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h2: HTMLElementProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h3: HTMLElementProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h4: HTMLElementProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h5: HTMLElementProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h6: HTMLElementProps;
      /**
       * Provides general information (metadata) about the document, including
       * its title and links to its scripts and style sheets.
       */
      head: HTMLElementProps;
      /** Represents a group of introductory or navigational aids. */
      header: HTMLElementProps;
      /**
       * Represents a thematic break between paragraph-level elements (for
       * example, a change of scene in a story, or a shift of topic with a
       * section).
       */
      hr: HTMLElementProps;
      /**
       * Represents the root of an HTML document. All other elements must be
       * descendants of this element.
       */
      html: HTMLHtmlElementProps;
      i: HTMLElementProps;
      iframe: HTMLIFrameElementProps;
      img: HTMLImageElementProps;
      input: HTMLInputElementProps;
      ins: HTMLElementProps;
      kbd: HTMLElementProps;
      label: HTMLLabelElementProps;
      legend: HTMLElementProps;
      li: HTMLLIElementProps;
      link: HTMLLinkElementProps;
      main: HTMLElementProps;
      map: HTMLMapElementProps;
      mark: HTMLElementProps;
      menu: HTMLMenuElementProps;
      menuitem: HTMLElementProps;
      meta: HTMLMetaElementProps;
      meter: HTMLMeterElementProps;
      nav: HTMLElementProps;
      noscript: HTMLElementProps;
      object: HTMLObjectElementProps;
      ol: HTMLOListElementProps;
      optgroup: HTMLOptGroupElementProps;
      option: HTMLOptionElementProps;
      output: HTMLElementProps;
      p: HTMLElementProps;
      param: HTMLParamElementProps;
      picture: HTMLElementProps;
      pre: HTMLElementProps;
      progress: HTMLProgressElementProps;
      q: HTMLQuoteElementProps;
      rp: HTMLElementProps;
      rt: HTMLElementProps;
      ruby: HTMLElementProps;
      s: HTMLElementProps;
      samp: HTMLElementProps;
      script: HTMLScriptElementProps;
      section: HTMLElementProps;
      select: HTMLSelectElementProps;
      small: HTMLElementProps;
      source: HTMLSourceElementProps;
      span: HTMLElementProps;
      strong: HTMLElementProps;
      style: HTMLStyleElementProps;
      sub: HTMLElementProps;
      summary: HTMLElementProps;
      sup: HTMLElementProps;
      table: HTMLElementProps;
      tbody: HTMLElementProps;
      td: HTMLTableDataCellElementProps;
      textarea: HTMLTextAreaElementProps;
      tfoot: HTMLElementProps;
      th: HTMLTableHeaderCellElement;
      thead: HTMLElementProps;
      time: HTMLElementProps;
      title: HTMLTitleElementProps;
      tr: HTMLElementProps;
      track: HTMLTrackElementProps;
      u: HTMLElementProps;
      ul: HTMLElementProps;
      var: HTMLElementProps;
      video: HTMLVideoElementProps;
      wbr: HTMLElementProps;
    }
  }
}
