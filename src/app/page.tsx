import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import ArticlePopup from './components/ArticlePopup.cli';
import FloatingMenu from './components/FloatingMenu.cli';
import FloatingEmblem from './components/FloatingEmblem.cli';
import markers from './data/markers.json';

export default async function Home() {
  const MyMap = useMemo(() => dynamic(
    () => import('./components/Map.cli'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  const markers = await getMapMarkers();

  return (
    <main>
      <div id="map" className="w-full h-screen">
        <FloatingMenu />
        <FloatingEmblem/>
        <MyMap markers={markers}/>
        <ArticlePopup />
      </div>
    </main>
  );
}

/*
PLACES:
The main groups of Waldensians were based in three regions : Provence, Calabria and the Alps. All suffered from persecution at one time or another.

Lyon - Peter Waldo - 1170
14th and 15th centuries, waves of Waldensians left the Dauphiné (Southeastern France) and Piedmont Valleys to settle in Provence
1532 Waldensian synod in Chanforan

1545 - as soon as they supported the Reform Movement they were victims of persecution by the famous leader of the Inquisition, Jean de Roma, and Baron Jean Meynier d’Oppède, first President of the Parliament of Provence at Aix. The “Arrêt de Mérindol” of 1540, ordered the complete destruction of the village , although this did not actually take place until 1545. Mérindol was plundered and destroyed by Baron Meynier d’Oppède’s troops. Most of the inhabitants were able to flee and later returned. The massacre spread throughout the Luberon and there were more than 2000 victims. 700 Waldesians were sent to the galleys. This massacre of the Waldensians shocked the whole of Europe and was never forgotten in the area.

1555 onwards, the first “temples” were built. Piedmont Valleys

The Inquisition sent a mission to this part of Italy in 1560 with it’s attendant courts and punishment at the stake. Two pastors who died for their faith have never been forgotten – Jacques Bonello and Giovanni Luigi Pascale – who had both been sent to Calabria by the Church in Geneva. One was burned at the stake in Palermo in 1560 and the other in Rome in the same year. The country was then ravaged by a violent military campaign and the Waldensians were decimated ; those who escaped were forced to renounce their faith.

Duke Emmanuel Philibert, who had regained his land with the treaty of Cateau-Cambrésis (1559), sent a military expedition in 1560 against the Waldensians in the Luserne valley. Their preachers persuaded them to give up their traditional non-violence and take up arms. They fought up in the mountains and for them it was truly a holy war, like the fight between David and Goliath. Before every battle, the soldiers would pray and sing psalms, while their pastors maintained strict discipline among the troops and forbade any looting. The Dauphine Protestants sent military support from the other side of the Alps and the Waldensians were able to make a stand against the Duke’s armies. After six months of fighting, he agreed to sign a treaty. The Cavour agreement (1581) brought back the special privileges and exemptions which the Waldensians had previously been given

In 1630 an epidemic of the plague came to the Waldensian valleys and destroyed a third of the population

1640 onwards the Waldensians came under attack more and more frequently. In 1655 troops were stationed with Waldensian families and began to massacre the population. The Protestant valleys of the Piedmont became Roman Catholic once more. These massacres, known as the “Piedmont Easter massacre” or the “Bloody Spring” aroused indignation in Cromwell’s England. 

In 1685 the effects of the Edict of Nantes were also felt in the French territory of the Piedmont Valleys : Le Val Plagela and the Val Cluson. Consequently, many Waldensian families decided to go into exile and settled in Hesse-Cassel, founding villages where they had freedom of conscience and could live in accordance with their faith.

The Duke of Savoy, Victor Amadeus II, who married Louis XIV’s niece, continued Louis XIV’s religious policies : in the decree of January 1686, he banished their pastors, forbade public worship and forced parents to give their children a Roman Catholic baptism. The pastor Henri Arnaud advocated rebellion. The Waldensians were defeated in a short three-day war ; many died and 8500 were imprisoned. However, thanks to Swiss intervention, a certain number managed to flee to Geneva.

In 1688, the political situation in Europe was turned upside down when William of Orange came to the English throne and formed a coalition against Louis XIV. He sent emissaries to the exiled Waldensians in Switzerland and secretly organised their return to the Piedmont Valleys in 1689. This episode is known as the “Glorious Return“.

Lombardia - 18 century

*/
async function getMapMarkers() {
  return markers;
  // const aPIURL = process.env.HYGRAPH_ENDPOINT || '';
  // const response = await fetch(
  //   aPIURL,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       query: `
  //       query Places {
  //         places {
  //           coordinates {
  //             latitude
  //             longitude
  //           }
  //           createdAt
  //           description
  //           imageUrl
  //           links
  //           id
  //           name
  //           publishedAt
  //           updatedAt
  //         }
  //       }`,
  //     }),
  //   }
  // );
  // const json = await response.json();
  // return json.data.places;
}