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

export interface ClassProps {
  class?: string;
  /** React shim, use `class` instead */
  className?: string;
}

export interface NonVoidProps extends ClassProps {
  unsafeHTML?: string;
  /** React shim, use `unsafeHTML` instead */
  dangerouslySetInnerHTML?: string;
}

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
      a: HTMLAnchorElementProps & NonVoidProps;
      /**
       * Represents an abbreviation and optionally provides a full description
       * for it. If present, the title attribute must contain this full
       * description and nothing else.
       */
      abbr: HTMLElementProps & NonVoidProps;
      /**
       * Supplies contact information for its nearest <article> or <body>
       * ancestor; in the latter case, it applies to the whole document.
       */
      address: HTMLElementProps & NonVoidProps;
      /**
       * Defines a hot-spot region on an image, and optionally associates it
       * with a hypertext link. This element is used only within a `<map>`
       * element.
       */
      area: HTMLAreaElementProps & ClassProps;
      /**
       * Represents a self-contained composition in a document, page,
       * application, or site, which is intended to be independently
       * distributable or reusable (e.g., in syndication).
       */
      article: HTMLElementProps & NonVoidProps;
      /**
       * Represents a section of the page with content connected tangentially
       * to the rest, which could be considered separate from that content.
       */
      aside: HTMLElementProps & NonVoidProps;
      /** Used to embed sound content in documents. */
      audio: HTMLAudioElementProps & NonVoidProps;
      /**
       * Represents a span of text stylistically different from normal text,
       * without conveying any special importance or relevance. It is typically
       * used for keywords in a summary, product names in a review, or other
       * spans of text whose typical presentation would be boldfaced.
       */
      b: HTMLElementProps & NonVoidProps;
      /**
       * Specifies the base URL to use for all relative URLs contained within a
       * document. There can be only one <base> element in a document.
       */
      base: HTMLBaseElementProps & ClassProps;
      /**
       * Isolates a span of text that might be formatted in a different
       * direction from other text outside it. This element is useful when
       * embedding text with an unknown directionality, from a database for
       * example, inside text with a fixed directionality.
       */
      bdi: HTMLElementProps & NonVoidProps;
      /** Used to override the current directionality of text. */
      bdo: HTMLElementProps & NonVoidProps;
      /** Indicates that the enclosed text is an extended quotation. */
      blockquote: HTMLQuoteElementProps & NonVoidProps;
      /**
       * Represents the content of an HTML document. There can be only one
       * `<body>` element in a document.
       */
      body: HTMLBodyElementProps & NonVoidProps;
      /**
       * Produces a line break in text (carriage-return). It is useful for
       * writing a poem or an address, where the division of lines is
       * significant.
       */
      br: HTMLElementProps & ClassProps;
      /** Represents a clickable button. */
      button: HTMLButtonElementProps & NonVoidProps;
      /**
       * Used to draw graphics via scripting (usually JavaScript). For example,
       * it can be used to draw graphs, make photo compositions or even perform
       * animations.
       */
      canvas: HTMLCanvasElementProps & NonVoidProps;
      /**
       * Represents the title of a table. It is always the first descendant of
       * a `<table>`.
       */
      caption: HTMLElementProps & NonVoidProps;
      /**
       * Represents a reference to a creative work. It must include the title of
       * a work or a URL reference.
       */
      cite: HTMLElementProps & NonVoidProps;
      /**
       * Represents a fragment of computer code. By default, it is displayed in
       * the browser's default monospace font.
       */
      code: HTMLElementProps & NonVoidProps;
      /**
       * Defines a column within a table and is used for defining common
       * semantics on all common cells. It is generally found within a
       * `<colgroup>` element.
       */
      col: HTMLElementProps & ClassProps;
      /** Defines a group of columns within a table. */
      colgroup: HTMLElementProps & NonVoidProps;
      /**
       * Links a given content with a machine-readable translation. If the
       * content is time- or date-related, the `<time>` must be used.
       */
      data: HTMLElementProps & NonVoidProps;
      /**
       * Contains a set of `<option>` elements that represent the values
       * available for other controls.
       */
      datalist: HTMLDataListElementProps & NonVoidProps;
      /** Indicates the description of a term in a description list `<dl>`. */
      dd: HTMLElementProps & NonVoidProps;
      /**
       * Represents a range of text that has been deleted from a document. This
       * element is often (but need not be) rendered with strike-through text.
       */
      del: HTMLElementProps & NonVoidProps;
      /**
       * Used as a disclosure widget from which the user can retrieve additional
       * information.
       */
      details: HTMLElementProps & NonVoidProps;
      /** Represents the defining instance of a term. */
      dfn: HTMLElementProps & NonVoidProps;
      /**
       * Generic container for flow content, which does not inherently
       * represent anything.
       */
      div: HTMLElementProps & NonVoidProps;
      /**
       * Encloses a list of groups of terms and descriptions. Common uses for
       * this element are to implement a glossary or to display metadata (a list
       * of key-value pairs).
       */
      dl: HTMLElementProps & NonVoidProps;
      /**
       * Identifies a term in a description list. This element can occur only as
       * a child element of a `<dl>`.
       */
      dt: HTMLElementProps & NonVoidProps;
      /** Marks text that has greater emphasis. */
      em: HTMLElementProps & NonVoidProps;
      /**
       * Represents an integration point for an external application or
       * interactive content (in other words, a plug-in).
       */
      embed: HTMLEmbedElementProps & ClassProps;
      /**
       * Used to group several controls as well as labels (`<label>`) within a
       * web form.
       */
      fieldset: HTMLFieldSetElementProps & NonVoidProps;
      /**
       * Represents a caption or a legend associated with a `<figure>` or an
       * illustration.
       */
      figcaption: HTMLElementProps & NonVoidProps;
      /**
       * Represents self-contained content, frequently with a `<figcaption>`.
       */
      figure: HTMLElementProps & NonVoidProps;
      /**
       * Represents a footer for its nearest sectioning content or sectioning
       * root element.
       */
      footer: HTMLElementProps & NonVoidProps;
      /**
       * Represents a document section that contains interactive controls to
       * submit information to a web server.
       */
      form: HTMLFormElementProps & NonVoidProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h1: HTMLElementProps & NonVoidProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h2: HTMLElementProps & NonVoidProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h3: HTMLElementProps & NonVoidProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h4: HTMLElementProps & NonVoidProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h5: HTMLElementProps & NonVoidProps;
      /**
       * Heading elements implement six levels of document headings, `<h1>` is
       * the most important and `<h6>` is the least.
       */
      h6: HTMLElementProps & NonVoidProps;
      /**
       * Provides general information (metadata) about the document, including
       * its title and links to its scripts and style sheets.
       */
      head: HTMLElementProps & NonVoidProps;
      /** Represents a group of introductory or navigational aids. */
      header: HTMLElementProps & NonVoidProps;
      /**
       * Represents a thematic break between paragraph-level elements (for
       * example, a change of scene in a story, or a shift of topic with a
       * section).
       */
      hr: HTMLElementProps & ClassProps;
      /**
       * Represents the root of an HTML document. All other elements must be
       * descendants of this element.
       */
      html: HTMLHtmlElementProps & NonVoidProps;
      i: HTMLElementProps & NonVoidProps;
      iframe: HTMLIFrameElementProps & NonVoidProps;
      img: HTMLImageElementProps & ClassProps;
      input: HTMLInputElementProps & ClassProps;
      ins: HTMLElementProps & NonVoidProps;
      kbd: HTMLElementProps & NonVoidProps;
      label: HTMLLabelElementProps & NonVoidProps;
      legend: HTMLElementProps & NonVoidProps;
      li: HTMLLIElementProps & NonVoidProps;
      link: HTMLLinkElementProps & ClassProps;
      main: HTMLElementProps & NonVoidProps;
      map: HTMLMapElementProps & NonVoidProps;
      mark: HTMLElementProps & NonVoidProps;
      menu: HTMLMenuElementProps & NonVoidProps;
      menuitem: HTMLElementProps & NonVoidProps;
      meta: HTMLMetaElementProps & ClassProps;
      meter: HTMLMeterElementProps & NonVoidProps;
      nav: HTMLElementProps & NonVoidProps;
      noscript: HTMLElementProps & NonVoidProps;
      object: HTMLObjectElementProps & NonVoidProps;
      ol: HTMLOListElementProps & NonVoidProps;
      optgroup: HTMLOptGroupElementProps & NonVoidProps;
      option: HTMLOptionElementProps & NonVoidProps;
      output: HTMLElementProps & NonVoidProps;
      p: HTMLElementProps & NonVoidProps;
      param: HTMLParamElementProps & ClassProps;
      picture: HTMLElementProps & NonVoidProps;
      pre: HTMLElementProps & NonVoidProps;
      progress: HTMLProgressElementProps & NonVoidProps;
      q: HTMLQuoteElementProps & NonVoidProps;
      rp: HTMLElementProps & NonVoidProps;
      rt: HTMLElementProps & NonVoidProps;
      ruby: HTMLElementProps & NonVoidProps;
      s: HTMLElementProps & NonVoidProps;
      samp: HTMLElementProps & NonVoidProps;
      script: HTMLScriptElementProps & NonVoidProps;
      section: HTMLElementProps & NonVoidProps;
      select: HTMLSelectElementProps & NonVoidProps;
      small: HTMLElementProps & NonVoidProps;
      source: HTMLSourceElementProps & ClassProps;
      span: HTMLElementProps & NonVoidProps;
      strong: HTMLElementProps & NonVoidProps;
      style: HTMLStyleElementProps & NonVoidProps;
      sub: HTMLElementProps & NonVoidProps;
      summary: HTMLElementProps & NonVoidProps;
      sup: HTMLElementProps & NonVoidProps;
      table: HTMLElementProps & NonVoidProps;
      tbody: HTMLElementProps & NonVoidProps;
      td: HTMLTableDataCellElementProps & NonVoidProps;
      textarea: HTMLTextAreaElementProps & NonVoidProps;
      tfoot: HTMLElementProps & NonVoidProps;
      th: HTMLTableHeaderCellElement & NonVoidProps;
      thead: HTMLElementProps & NonVoidProps;
      time: HTMLElementProps & NonVoidProps;
      title: HTMLTitleElementProps & NonVoidProps;
      tr: HTMLElementProps & NonVoidProps;
      track: HTMLTrackElementProps & ClassProps;
      u: HTMLElementProps & NonVoidProps;
      ul: HTMLElementProps & NonVoidProps;
      var: HTMLElementProps & NonVoidProps;
      video: HTMLVideoElementProps & NonVoidProps;
      wbr: HTMLElementProps & ClassProps;
    }
  }
}
