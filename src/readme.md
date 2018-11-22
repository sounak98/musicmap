# MusicMap Application

## Release 0.1

[Functional Spec](../specs/release0.1-fs.md)

[High Level Design Doc](../specs/release0.1-hld.md)

Code coming soon.

## Incentive Function

## Data Pipeline

Every type of data needs to go through a multi-phase process before the data or service is able to be discovered or consumed. Such phases are ingestion, normalizing, storing, curating and so on. This is referred to as a data pipeline. Instead of watching the entire pipeline as an end-to-end process for each data entry, we suggest to split the pipeline for musicmap into two big phases: an ingestion phase and a curation phase. This has several benefits: the monotonous and non-scientific work becomes separated from the more difficult work that requires a greater deal of intelligence. This will allow both pipelines to operate at different speeds, without the curation phase becoming a bottleneck for the ingestion phase. The ingestion phase can be automated by bots and programs, allowing for even faster ingestion. With all the data and its corresponding metadata already in place, the workload and initial barrier for the human curators to start curating becomes much smaller.


## Ingestion Phase

During the ingestion phase, either human or bot contributors can enter new songs to the main registry. Human contributors will interact with a contributor UI with captcha identification that will allow to add bulk (add several songs in one action) and that tries to automatically fetch the metadata from the 3rd party provider.  Bot contributors on the other hand can directly interact with the API. To accelerate the whole process, we will not regard this as a TCR with challenging and staking mechanisms. Instead, the data will simply automatically be vetted for consistency (is this an audio link?) uniqueness (is this song not already in the registry?), and - if possible - inappropriate or illegal behaviour (which should become not really a problem when using only YouTube Music instead of YouTube). Once vetted, the data becomes automatically added to the main registry or “unallocated” group of songs. The metadata gets stored in a centralized metadata storage, where the unique hash of each song (of combined metadata) gets written on-chain. 

The token contract will mint tokens as reward for the contributors. Human contributors will be rewarded more tokens per contribution than bots. Therefore, instead of buying in tokens, a frictionless utility token is proposed that rewards work. A user’s token funds are thus directly tied to their contribution to the network, ruling out any form of financial speculation or attack vector. 

This first Ingestion or Contribution phase should also be regarded as a roadmap period after final release: a first stage that serves as an introduction to musicmap. This stage can be marketed as a first-phase full scale assault (“bot wars”) without the need for focus on curation. This allows the greater public to become familiar with musicmap and to give the community the time to think about proper curation. In addition: the bigger the unallocated registry grows, the more the community will be motivated to start curating it. It is more incentivizing to categorize an enormous list into various labels than filling numerous empty lists of different labels.

Alternatively, because the ingestion phase is separate from the curation phase, it might not be that harmful for the bootstrapping of the network to work with a financial token and potentially a bonding curve. Such design might prove useful in bridging the non-crypto with the crypto community.


## Curation Phase

Separating the ingestion from the curation pipeline has the additional benefit of specialized users and allowing anyone to help out: people who want to contribute to musicmap but do not possess any specific genre knowledge can do so by ingesting the main list. Vice versa: people who know a lot about music and genres but do not want to bother with tokens or ingestion, can go straight to the curation phase. Of course, contributors can also be curators and the other way around.·

During the curation phase, agents can interact with the main registry UI to place each song in the correct genre registry (after the condition has been met that this genre is created first). These agents are most likely humans, but they can also be algorithms as any mistake made by the A.I. can be corrected by human agents afterwards. 

Because mass adoption by a largely non-crypto community is absolutely paramount to the success of musicmap, the friction of a crypto wallet and the barrier of tying financial liquidity to any token cannot be underestimated enough. We believe that this problem is vastly ignored by many crypto projects, and they do not even rely on a community that is far, far away from the crypto space as musicmap does. Therefore the curation phase will not work with tokens in the traditional sense, but user credits that can be stored off chain or on-chain as a non-ERC20 utility token without any form of exchange. There are several benefits of working with credits instead of buy-in tokens with a traditional TCR: 1. The removal of a ppwallet and any form of financial risk or abuse. 2. The possibility to create genre-specific credits, without having to deploy a large amount of costly tokens (estimated between 200 and 500 different credits). 3. The ability to burn and mint by will with little impact on the value of the credit/token and without the restraint of having to implement a zero sum balance. 4. Whales cannot force their way in by buying lots of tokens. 5. The parameter values for each type of credit reward and penalty can be independently finetuned.

Curators will be rewarded credits according to the genre in which they are curating. Any statistical user data will also be tracked in the user database. The genre lists will thus work as a TCR, albeit with credits instead of tokens (Credit Curated Registry or CCR). 


## Continuous Voting

Instead of working with stage-oriented and politics-inspired challenging and voting mechanisms, we can also take a looser and more reputation-based approach, aligning more with a rather dynamic audience for which every second counts. In this approach, we propose a system of upvoting and downvoting, but where the registry tracks the entire history of votes (thus preferably on-chain, albeit with a compiled bulk of transactions). 

For each song, a user can vote (but only once) whether or not that song certainly belongs to the genre (vouch, check) or needs to be rejected (reject, cross). Of course, a user can also take no action. When a user chooses either to vouch or reject, he or she will receive all the subsequent respective votes from the same direction as credit points. So if Alice chooses to reject, all the rejection votes after hers will count towards her score. A person’s user score will then be determined by

User score = ⅀n(vouch) + ⅀n(reject)

There will therefore be three leaderboards or score rankings: the user with the highest vouch points or defender score, the user with the highest reject points or challenger score, and the user with the highest combination of both or arbiter score. These three leaderboard unlock different permissions.

The songs of a certain genre will be ranked according to the number of positive (vouch) votes by the simple formula:  

Song rating = ⅀(vouch) - ⅀(reject)

When a song has more reject votes than vouches, this will result in a negative score and these songs will be hidden from the main playlist (but can be made visible by the user).

Proposing a song will automatically give you a vouch vote for that song, and will also give you a score of +1 when accepted into registry.


## Attack Vectors & Problems

Spam everything accept.
You are more likely to win than to gain as the lists should be already 70-90% correct (estimate). 
    → Punishment for clicking accept when it gets rejected should be accordingly high.

Troll Propose Attack
Spam propose as many songs as possible from a totally different genre.
    → Ban user from proposing within a genre after X amounts of damned songs

Diverging from Schelling Point
The initial bootstrapping phase is very important to set the right Schelling Point direction.
When the first 50-100 songs define a different schelling point than the actual genre definition, it is very hard to rectify, as the initial playlist - accepted by the community - will have become the source of truth.
    → Define different, more strict rules for the first 50-100 songs
    → Allow governance for the genre title and registry (to be changed, alterered or even subcategorized)
    → WIKI should also mitigate this risk

Personal User Troll Attacks
Certain users become targeted to decrease their user points and dethrone them from the leaderboard
    → implement maximum anonimity, only show user names at leaderboard. Make sure user ID cannot be fetched from the back end

Spam everything reject (with different accounts)
You will not lose any points but you will diminish the overall value of the genre. If you can do that with different accounts, you can hurt scores.
    → make it so that user scores are not affected by the opposite votes (i.e. when i vote accept, the number of reject votes afterwards do not matter)
    → track user IP? Make ID’s unique? Unique emailadresses?

Coordinated group attack
Influence a large group of people by all voting in the same direction to win credit points or to bump or attack a specific song.
    → Do not implement user fora or links to reddit channels to prevent coordinated attacks
    → this attack is already mitigated because only the first ones will win a lot. The last in line never has any benefit for voting in the direction that it was going.
    → Implement time lock if a song receives more than X votes in Y time

Skewing of Genres
    → This is for later, but can be prevented by reward for bottom 20% of genres and penalty for top 20% of genres

Bootstrapping / Chicken or Egg problem
When the lists remain relatively empty, there will be no incentive to further fill them. Vicious cycle. An early mover advantage must be put into place.
    → Ties in with different rules for initial registry. Reward first 50-100 songs harder.

Does it makes sense to go infinitely down? Will people still vote reject when the song is already -10? Will it not be better to remove the song then? But then people are more likely to vote accept as the reward possibility is much greater. 

Bump to the top
Once a song has established lots of positive votes, it will become almost “untouchable”. Bumping a song fast to high place with different accounts can net the user lots of points but can also put incorrect songs for a long time in the list.
    → Prevent many bumps within a limited timespan.

You are more likely to win than to gain as the lists should be already 70-90% correct (estimate). 
    → Punishment for clicking accept when it gets rejected should be accordingly high.

Troll Propose Attack
Spam propose as many songs as possible from a totally different genre.
    → Ban user from proposing within a genre after X amounts of damned songs

Diverging from Schelling Point
The initial bootstrapping phase is very important to set the right Schelling Point direction.
When the first 50-100 songs define a different schelling point than the actual genre definition, it is very hard to rectify, as the initial playlist - accepted by the community - will have become the source of truth.
    → Define different, more strict rules for the first 50-100 songs
    → Allow governance for the genre title and registry (to be changed, alterered or even subcategorized)
    → WIKI should also mitigate this risk

Personal User Troll Attacks
Certain users become targeted to decrease their user points and dethrone them from the leaderboard
    → implement maximum anonimity, only show user names at leaderboard. Make sure user ID cannot be fetched from the back end

Spam everything reject (with different accounts)
You will not lose any points but you will diminish the overall value of the genre. If you can do that with different accounts, you can hurt scores.
    → make it so that user scores are not affected by the opposite votes (i.e. when i vote accept, the number of reject votes afterwards do not matter)
    → track user IP? Make ID’s unique? Unique emailadresses?

Coordinated group attack
Influence a large group of people by all voting in the same direction to win credit points or to bump or attack a specific song.
    → Do not implement user fora or links to reddit channels to prevent coordinated attacks
    → this attack is already mitigated because only the first ones will win a lot. The last in line never has any benefit for voting in the direction that it was going.
    → Implement time lock if a song receives more than X votes in Y time

Skewing of Genres
    → This is for later, but can be prevented by reward for bottom 20% of genres and penalty for top 20% of genres

Bootstrapping / Chicken or Egg problem
When the lists remain relatively empty, there will be no incentive to further fill them. Vicious cycle. An early mover advantage must be put into place.
    → Ties in with different rules for initial registry. Reward first 50-100 songs harder.

Does it makes sense to go infinitely down? Will people still vote reject when the song is already -10? Will it not be better to remove the song then? But then people are more likely to vote accept as the reward possibility is much greater. 

Bump to the top
Once a song has established lots of positive votes, it will become almost “untouchable”. Bumping a song fast to high place with different accounts can net the user lots of points but can also put incorrect songs for a long time in the list.
    → Prevent many bumps within a limited timespan.

