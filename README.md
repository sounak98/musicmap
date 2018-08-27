# musicmap

:musical_score: Visit musicmap at [www.musicmap.info](https://www.musicmap.info)

## Abstract

Musicmap is a platform that offers free or commons data between providers and consumers, also described as contributors. It can be seen as a fairly simple marketplace that does not hold physical data, does not require proof of consumption, or any type of data protection. On the other hand, it will have complex and experimental curation building blocks (TCR variants) and a very challenging dynamic UI linked to the registry framework.

Musicmap will share non-physical data (URL, links) primarily between the common (i.e. non-business) public (C2C). Providers (aka Contributors in this case) are anyone who is motivated to bring structure in a chaotic mass of digital music archives, and who wants to contribute to musicmap’s goals as described in the original purpose paragraph and outlined below. Consumers in this case (aka Users) are basically anyone who likes music.

All this data will be organized by genre. Genres will form the main building blocks to structure this archive and the capability of musicmap to achieve this in a more or less succesful manner, is what makes it unique. Contributors can create their own lists based on genre, which will automatically deploy the right smart contracts and - if needed - a new token. Contributors can eventually also build communities around these genre lists and organize or govern towards certain goal (like tribes), e.g. making an agenda for concerts and parties, making a list of new and unknown artists, rallying community meetups, etc.


## Motivation & Mission

There are 4 main goals and principles of musicmap, which all have both an active and passive component because it is a network by the people for the people:

1. **Explore <> Plot**: To provide a music explorer service that has two unique benefits. First combining different 3rd party providers into one, thus opening a massive library of music from within the same platform while also maintaining all these entries in a clean and structured manner. Second and even more important: allowing people to discover music in an active way and therefore regaining the satisfaction of finding music themselves instead of through recommendations and this in a highly attractive visual interface based around genres; the digital equivalent of the record store.

2. **Learn <> Inform**: Concentrate information about music history and sociology in one place, where it can be curated and evaluated and freely made available to the public, in order to educate about music genres without bias or censorship.

3. **Grow <> Nurture**: Give benefits to the long tail artists by working in a completely transparant white box ecosystem that does not use black box algorithms and does not promote the most popular artists. Each artist has the same chance of being discovered as the next one.

4. **Unite <> Build**: Bring communities together around similar music and enabling them to govern the archives themselves. 


## Papers and Information

It is recommended to check the [glossary](https://github.com/oceanprotocol/musicmap/wiki/1.-Quick-Musicmap-Glossary) list for project-specific terms.

More information (_ontology, list of functionalities, roadmap, research definitions,..._) can be found in the Google Doc [musicmap spreadsheets](https://docs.google.com/spreadsheets/d/1OYCkgvwwHP_sSMbNA7i0XvSVGFVsgFnAwF-XGv0MTuk/edit?usp=sharing). 

For the bigger story that ties in the original musicmap theory chapters with the new goals and architecture (though slightly outdated and more subject to change), please visit the [Musicmap Enhancement Protocol Paper](https://docs.google.com/document/d/1auYC-DZk3ubqx6F4XqqZi0mJJHT1-oq8v7V2Fqw8-h4/edit?usp=sharing).
).

For an overview of all the different capabilities, structured by release, and the various research tasks, see [here](https://docs.google.com/document/d/1dSMROk7OHaiyzNDS1zrs6aONavaGMmR34qcJSKZ0lvk/edit?usp=sharing).

## Architecture Overview

<overview graph> here

The architecture can be divided into three large project **divisions**.
* **Melody (Treble):** Front end UI/UX (including content), combination of HTML, CSS, 3D.js and Canvas.
* **Harmony (Mid):** Off-chain or hybrid back end data storage and data functions.
* **Rhythm (Bass):** On-chain governance framework with curation building blocks and native token.

The final architecture can also be divided into three hierarchial **tiers**, which follow the evolution of releases.
With each release, an additional tier and complexity will be added to the network. The addition of each tier will have serious consequences on every division. All tiers exist within an overarching one-element forth tier (Tier 0): _the Music Universe_. the tiers are as follows:
* Tier 1: **Super-Genres**: subcultural groups of genres that belong together (_e.g. Rap, Blues,..._) - estimated ideal amount: 30-50
* Tier 2: **Nexi** or Core Genres: well-defined genres that form the main level of interactivity with the network (_e.g. Garage Rock, Minimal Techno, Bossa Nova_) - estimated ideal amount: 300-500
* Tier 3: **Data Entries** or Music Songs: data container of a singular song with URL's to various 3rd party providers and all metadata - estimated ideal amount: 50-150 million


## Actors

The various actors in the musicmap ecosystem are as follows:

### Consumer / User
Consumers are users of the platform who want to browse for music (=consuming the data). Anyone who likes music can be a consumer. Consumers do not need authentication or liquidity.

### Contributor
Contributors add value to the network by proposing Data Entries or Nexi. Contributors must have a wallet and a minimum liquidity as they will have to put up stake in order to propose a Data Entry. Since we are dealing with very small amounts of data with little value, the stake must be extremely minimal. Since musicmap relies on a very large amount of contributors, and particularly outside the blockchain community, authentication and onboarding must show the lowest possible threshold. Users can contribute either a new Data Entry or a new Nexus (or even possibly a new Super-Genre).

### Curator
Curators judiciously maintain the different registries by voting bad entries out and good ones in. Curators also need to have a wallet and liquidity. The rules when an actor can become a curator are not yet clear. Normally, curators are bound either to their Nexus or their super-genre and thus can only curate their respective registries or markets. Being a curator across different markets is possible if the curators are active in those markets. Users can curate either within a Nexus (deciding what songs should be in there and cleaning the metadata) or within a Super-Genre (deciding what Nexi should be in there).
