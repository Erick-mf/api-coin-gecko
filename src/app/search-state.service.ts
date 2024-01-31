import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class SearchStateService {
    private searchTerms = "";
    private searchResults: any[] = [];

    setSearchTerms(terms: string) {
        this.searchTerms = terms;
    }

    getSearchTerms() {
        return this.searchTerms;
    }

    setSearchResults(results: any[]) {
        this.searchResults = results;
    }

    getSearchResults() {
        return this.searchResults;
    }
}
