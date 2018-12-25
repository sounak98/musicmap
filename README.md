[![bannerocn](./specs/images/repo-banner@2x.png)](https://oceanprotocol.com)
[![bannermm](./specs/images/banner-mm-github.png)](https://musicmap.info)

<h1 align="center">Musicmap</h1>

> :musical_score: A Commons Marketplace for Music Curation sailing on the Ocean

---

Table of Contents
==================

- [Table of Contents](#table-of-contents)
- [Musicmap](#musicmap)
  * [Abstract](#abstract)
  * [Principles and Mission](#principles-and-mission)
  * [Roadmap - Release Overview](#roadmap---release-overview)
  * [Architecture Overview](#architecture-overview)
  * [Actors](#actors)
    + [Consumer](#consumer)
    + [Contributor](#contributor)
    + [Curator](#curator)
  * [Further Information](#further-information)
  * [Developer Setup](developer-setup)
  * [License](#license)


---

**This is an early alpha state and you can expect running into problems. If you encounter one, please open a new issue.**

---

# Musicmap

## Abstract

Musicmap is an open platform that wants to form a navigator hub for all music lovers to connect to any online music service in an easy, attractive and organised way by using music genres. Because music genres are tricky, non-mathematically-defined subjects, musicmap relies on an active community curating the ecosystem. The aim is to become a decentralized, transparent, open ecosystem where long-tail artists can be discovered, music knowledge is preserved, and music archives are organised without any central authority.

From a business perspective, it is a platform that offers free or commons data between providers and consumers, also described as contributors. It can be seen as a fairly simple marketplace that does not hold physical data, does not require proof of consumption, or any type of data protection. On the other hand, it will have complex and experimental curation building blocks (TCR variants) and a very challenging dynamic UI linked to the registry framework.

Musicmap will share non-physical data (URL, links) primarily between the common (i.e. non-business) public (C2C). Providers (aka Contributors in this case) are anyone who is motivated to bring structure in a chaotic mass of digital music archives, and who wants to contribute to MusicMap’s goals as described in the original purpose paragraph and outlined below. Consumers in this case (aka Users) are basically anyone who likes music.

All this data will be organized by genre. Genres will form the main building blocks to structure this archive and the capability of musicmap to achieve this in a more or less succesful manner, is what makes it unique. Contributors can create their own lists based on genre, which will automatically deploy the right smart contracts and - if needed - a new token. Contributors can eventually also build communities around these genre lists and organize or govern towards certain goal (like tribes), e.g. making an agenda for concerts and parties, making a list of new and unknown artists, rallying community meetups, etc.
  

## Principles and Mission

Being an open-source project, it is important to define which standards and principles to uphold. Any implementation should always keep these principles in mind and facilitate them.  
Further building on the initial _Purpose_ paragraph in the _Introduction_ chapter of musicmap released in 2016, we can now define four main goals and principles of Musicmap.
All of these have both an active and passive component because it is a network by the people for the people:

1. **Explore <> Plot**: We want to create a massive music explorer platform that has two unique benefits. First combining different 3rd party providers into one, thus opening a massive library of music from within the same platform while also maintaining all these entries in a clean and structured manner.
* Second and even more important: allowing people to discover music in an active way and therefore regaining the satisfaction of finding music themselves instead of relying solely recommendations/A.I. This in a highly attractive visual interface based around genres; the digital equivalent of the record store.
The "Plot" part indicates that the community themselves will actually build and maintain this map. Therefore the exploration experience becomes passive and active at the same time, creating a feedback loop.

2. **Learn <> Inform**: Concentrate information about music history and music sociology in one place, where it can be curated and evaluated and freely made available to the public, in order to educate about music genres without bias or censorship.
An enhanced wiki that only deals about music genres, for which information is scarce and hard to find.

3. **Grow <> Nurture**: Give benefits to the long tail artists by working in a completely transparent white box ecosystem that does not use black box algorithms and does not promote the most popular artists. Each artist should have the same chance of being discovered as the next one.
Ranking of artists or pushing artists to visible front end places should be done in 100% transparant mechanics that are controlled by the community.

4. **Unite <> Build**: Bring communities together around similar music and enabling them to govern the archives themselves. Reward the most contributing users, steer away from financial speculation, and allow governance parameters to be changed by the community. 
Enable Community Tribes around a certain genre to come together and get organised (events, parties, concerts, sales, promotion, artist networking,...).
  

## Roadmap - Release Overview

See [Roadmap & Capabilities](./specs/roadmap.md) for full description with capabilities.

Because musicmap is a complex and big project, where finetuning of the ecosystem is a critical component, it has to be maintained into several releases to test the end-to-end environment before moving on to the next step.
The most likely and logical roadmap for this are three releases with potentially one extra intermediary step (3.5 steps). The releases are named after the names of music notes, from small to large.

1. **Biscroma Release (alpha)**
The absolute minimal E2E environment using only one genre with one playlist that plugs into one provider (we will start with Spotify). A complete ecosystem within one genre.
The complete code for this release can be duplicated and alterered to test out either different interfaces, different music players, a different provider and/or different curation mechanics.

2. **Croma Release (beta)**
A combination of many genres into a framework. Genres can be created, edited, deleted,... A complete ecosystem of all genres.
Integration of a WIKI component.

3. **Minima Release (RC)**
Implementation of super-genres as higher level labels, structuring the chaos of many genres. Creation of a dynamic map based on a Graph DB in the back end.
  

## Architecture Overview

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

The various actors in the MusicMap ecosystem are as follows:

### Consumer

Consumers are users of the platform who want to discover new music (=consuming the data). Anyone who likes music can be a consumer. Consumers do not need authentication or liquidity.

### Contributor

Contributors add value to the network by proposing Data Entries or Nexi. Contributors must have a wallet and a minimum liquidity as they will have to put up stake in order to propose a Data Entry. Since we are dealing with very small amounts of data with little value, the stake must be extremely minimal. Since MusicMap relies on a very large amount of contributors, and particularly outside the blockchain community, authentication and onboarding must show the lowest possible threshold. Users can contribute either a new Data Entry or a new Nexus (or even possibly a new Super-Genre).

### Curator

Curators judiciously maintain the different registries by voting bad entries out and good ones in. Curators also need to have a wallet and liquidity. The rules when an actor can become a curator are not yet clear. Normally, curators are bound either to their Nexus or their super-genre and thus can only curate their respective registries or markets. Being a curator across different markets is possible if the curators are active in those markets. Users can curate either within a Nexus (deciding what songs should be in there and cleaning the metadata) or within a Super-Genre (deciding what Nexi should be in there).
  

## Further Information

* Visit Musicmap at [www.musicmap.info](https://www.musicmap.info)
* It is recommended to check the [glossary](https://github.com/oceanprotocol/MusicMap/wiki/1.-Quick-MusicMap-Glossary) list for project-specific terms.
* Read up about musicmap in the introduction, astract and methodology pages on www.musicmap.info
* Be sure to check out the specs folder, with the following documents:  
[Game Mechanics & Incentives](./specs/mechanics_part_i.md)  
[Roadmap & Capabilities](./specs/roadmap.md)

## Developer Setup

1. Clone this repo using `git clone https://github.com/oceanprotocol/musicmap.git`
2. cd to  `server/`
3. Inside `server/', add `.env` file shown below 
```
MONGODB_URL=mongodb://localhost:27017/musicmap
HTTP_SERVER_PORT=4000
HTTPS_SERVER_PORT=4001
SERVER_KEY_PATH=<you-can-leave-it-blank>
SERVER_CRT_PATH=<you-can-leave-it-blank>
CA_CRT_PATH=<you-can-leave-it-blank>
SPOTIFY_CLIENT_ID=<your-spotify-client-id> //not needed if you are not using or working on spotify
SPOTIFY_CLIENT_SECRET=<your-spotify-secret-key> //not needed if you are not using or working on spotify
SPOTIFY_TOKEN_URL=https://accounts.spotify.com/api/token
SPOTIFY_WEB_API_BASE_URL=https://api.spotify.com/v1

```
4. Start mongodb server locally ([download one from here ](https://www.mongodb.com/download-center/community))
5. Start the server using `npm install & start`. If all went well, server will be started on your given port
6. In a new terminal, `cd client`.
7. Start client using `npm install & start`. If all went well, react app will open up in the browser.

## License

```
Copyright 2018 Ocean Protocol Foundation
Copyright 2018 Kwinten Crauwels

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
