export function TopLevelLexicallyScopedDeclarations(node) {
  if (Array.isArray(node)) {
    const declarations = [];
    for (const item of node) {
      declarations.push(...TopLevelLexicallyScopedDeclarations(item));
    }
    return declarations;
  }
  switch (node.type) {
    case 'ClassDeclaration':
    case 'LexicalDeclaration':
      return [node];
    case 'Script':
      if (node.ScriptBody) {
        return TopLevelLexicallyScopedDeclarations(node.ScriptBody);
      }
      return [];
    case 'ScriptBody':
      return TopLevelLexicallyScopedDeclarations(node.StatementList);
    default:
      return [];
  }
}
