import { Extension } from '@tiptap/core';

export interface ParagraphStyleOptions {
  types: string[];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraphStyle: {
      setFirstLineIndent: (indent: boolean | string | null) => ReturnType;
      unsetFirstLineIndent: () => ReturnType;
    };
  }
}

export const ParagraphStyle = Extension.create<ParagraphStyleOptions>({
  name: 'paragraphStyle',

  addOptions() {
    return {
      types: ['paragraph'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: null,
            parseHTML: element => {
              return element.style.textIndent || element.getAttribute('data-indent') || null;
            },
            renderHTML: attributes => {
              if (!attributes.indent) {
                return {};
              }
              const value = typeof attributes.indent === 'boolean' && attributes.indent ? '1.27cm' : attributes.indent;
              return {
                style: `text-indent: ${value}`,
                'data-indent': 'true',
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFirstLineIndent:
        indent =>
        ({ commands }) => {
          if (!indent) {
            return commands.updateAttributes('paragraph', { indent: null });
          }
          const indentValue = typeof indent === 'boolean' ? (indent ? '1.27cm' : null) : indent;
          return commands.updateAttributes('paragraph', { indent: indentValue });
        },
      unsetFirstLineIndent:
        () =>
        ({ commands }) => {
          return commands.updateAttributes('paragraph', { indent: null });
        },
    };
  },
});
