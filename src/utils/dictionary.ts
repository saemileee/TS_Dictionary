type Term = string;
type Definition = string;
type Vocab = { [key: string]: string };

class Dict {
  private words: Vocab = {};
  public add(term: Term, definition: Definition): void {
    if (!this.exists(term)) {
      this.words[term] = definition;
      console.log(`${term}:${definition}이(가) 추가 되었습니다.`);
    }
  }
  public get(term: Term): Definition {
    const termDefinition = this.words[term];
    console.log(`${term}의 뜻은 ${termDefinition}입니다.`);
    return termDefinition;
  }
  public delete(term: Term): void {
    delete this.words[term];
    console.log(`${term}이(가) 삭제 되었습니다.`);
  }
  public update(term: Term, definition: Definition): void {
    this.words[term] = definition;
    console.log(`${term}:${definition}이(가) 수정 되었습니다.`);
  }
  public showAll(): void {
    Object.keys(this.words).forEach((term, idx) =>
      console.log(`단어${idx + 1}:${term}`)
    );
  }
  public count(): number {
    const wordsCount = Object.keys(this.words).length;
    console.log(`사전에 저장된 총 단어는 ${wordsCount}개 입니다.`);
    return wordsCount;
  }
  public upsert(term: Term, definition: Definition): void {
    if (this.exists(term)) {
      this.update(term, definition);
    } else {
      this.add(term, definition);
    }
  }
  public exists(term: Term): boolean {
    if (term in this.words) {
      console.log(`${term}은(는) 존재하는 단어입니다.`);
      return true;
    } else {
      console.log(`${term}은(는) 존재하지 않는 단어입니다.`);
      return false;
    }
  }
  public bulkAdd(words: { term: string; definition: string }[]): void {
    for (const word of words) {
      this.add(word.term, word.definition);
    }
  }
  public bulkDelete(terms: Term[]): void {
    for (const term of terms) {
      this.delete(term);
    }
  }
}

const dictionary = new Dict();
dictionary.add('a', '알파벳 에이');
dictionary.add('b', '알파벳 비');
dictionary.add('a', '알파벳 에이');
dictionary.get('a');
dictionary.delete('a');
dictionary.update('b', 'alphabet B');
dictionary.upsert('c', '알파벳 C');
dictionary.upsert('c', 'alphabet C');
dictionary.showAll();
dictionary.count();
dictionary.upsert('c', '알파벳 C');
dictionary.upsert('c', 'alphabet C');
dictionary.exists('a');
dictionary.bulkAdd([
  { term: 'd', definition: '알파벳d' },
  { term: 'e', definition: '알파벳e' },
]);
dictionary.bulkDelete(['d', 'e']);
