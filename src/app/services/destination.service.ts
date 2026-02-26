import { Injectable } from '@angular/core';

export interface Destination {
  id: number;
  name: string;
  description: string;
  type: string;
  popularity: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private destinations: Destination[] = [

    {
      id: 1,
      name: 'Udaipur',
      description: 'City of Lakes with royal charm.',
      type: 'Heritage',
      popularity: 'Medium',
      price: 8500,
      image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/udaipur.jpg'
    },
    {
      id: 2,
      name: 'Lakshadweep',
      description: 'Crystal clear waters and untouched beaches.',
      type: 'Island',
      popularity: 'Low',
      price: 18000,
      image: 'https://seasontours.org/wp-content/uploads/2024/04/4-29.webp'
    },
    {
      id: 3,
      name: 'Kodaikanal',
      description: 'Peaceful hill station with scenic valleys.',
      type: 'Hill Station',
      popularity: 'Medium',
      price: 7500,
      image: 'https://c.ndtvimg.com/2025-08/nlp3l9fc_travel_625x300_16_August_25.jpg?im=FeatureCrop,algorithm=dnn,width=545,height=307'
    },
    {
      id: 4,
      name: 'Taj Mahal, Agra',
      description: 'Symbol of love and Mughal architecture.',
      type: 'Historical',
      popularity: 'High',
      price: 6000,
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg'
    },
    {
      id: 5,
      name: 'Darjeeling',
      description: 'Famous for tea gardens and Himalayan views.',
      type: 'Hill Station',
      popularity: 'Medium',
      price: 9000,
      image: 'https://img.freepik.com/free-photo/asian-woman-wearing-chinese-traditional-dress-ban-rak-thai-village-mae-hong-son-province-thailand_335224-1169.jpg'
    },
    {
      id: 6,
      name: 'Jaipur',
      description: 'The Pink City known for forts and royal palaces.',
      type: 'Heritage',
      popularity: 'High',
      price: 9500,
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero'
    },
    {
      id: 7,
      name: 'Manali',
      description: 'Snowy mountains and adventure sports hub.',
      type: 'Hill Station',
      popularity: 'High',
      price: 11000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQZV2iSY6QOCC3u629ibl_aoPcEV5ApowZMw&s'
    },
    {
      id: 8,
      name: 'Varanasi',
      description: 'One of the oldest living cities with spiritual heritage.',
      type: 'Spiritual',
      popularity: 'High',
      price: 7000,
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/manikarnika-ghat-city-hero'
    },
    {
      id: 9,
      name: 'Ooty',
      description: 'Queen of hill stations with tea plantations and pleasant climate.',
      type: 'Hill Station',
      popularity: 'High',
      price: 8500,
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/destimg/mmt/destination/m_Ooty_main_tv_destination_img_1_l_764_1269.jpg'
    },
    {
      id: 10,
      name: 'Mysore Palace',
      description: 'Historic palace showcasing royal architecture and cultural heritage.',
      type: 'Heritage',
      popularity: 'High',
      price: 6500,
      image: 'https://bangalore247.in/wp-content/uploads/2021/03/Mysore-Palace-1280x720.jpg'
    },
    {
      id: 11,
      name: 'Charminar, Hyderabad',
      description: 'Iconic monument representing the rich history of Hyderabad.',
      type: 'Historical',
      popularity: 'High',
      price: 6000,
      image: 'https://indiainfrahub.com/wp-content/uploads/2020/08/Charminar.jpg'
    },
    {
      id: 12,
      name: 'Golden Temple, Amritsar',
      description: 'Sacred Sikh shrine known for peace and spirituality.',
      type: 'Spiritual',
      popularity: 'High',
      price: 7500,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxF3vupqic9XjaGkZTVE_a5S8aFhnc1ilWvg&s'
    },
    {
      id: 13,
      name: 'Goa Beaches',
      description: 'Famous for beaches, nightlife and water sports.',
      type: 'Beach',
      popularity: 'High',
      price: 12000,
      image: 'https://www.thebluekite.com/ckfinder/userfiles/images/15%20Fun%20Things%20To%20Do%20In%20Palolem%20Beach%2C%20South%20Goa%20-%20Trot_World.jpg'
    },
    {
      id: 14,
      name: 'Coorg',
      description: 'Coffee plantations and misty hills.',
      type: 'Hill Station',
      popularity: 'Medium',
      price: 8000,
      image: 'https://c.ndtvimg.com/2025-05/hrgf60uo_coorg_625x300_17_May_25.jpg'
    },
    {
      id: 15,
      name: 'Hampi',
      description: 'Ancient ruins and UNESCO heritage site.',
      type: 'Heritage',
      popularity: 'Medium',
      price: 7000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBFjdTNzZ5N6vlpehb4NPviNnEWEU-Tz-jNg&s'
    },
    {
      id: 16,
      name: 'Mount Abu',
      description: 'Only hill station in Rajasthan.',
      type: 'Hill Station',
      popularity: 'Low',
      price: 6500,
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/desttvimg/mmt/destination/m_Mount_Abu_tv_destination_img_1_l_709_1065.jpg'
    },
    {
      id: 17,
      name: 'Rishikesh',
      description: 'Yoga capital of the world and adventure hub.',
      type: 'Spiritual',
      popularity: 'High',
      price: 9000,
      image: 'https://t4.ftcdn.net/jpg/03/30/92/29/360_F_330922949_rfLRvrnz4a1GLkGjQL9HVuSzLEXj99wq.jpg'
    },
    {
      id: 18,
      name: 'Andaman & Nicobar',
      description: 'Tropical paradise with coral reefs.',
      type: 'Island',
      popularity: 'Medium',
      price: 20000,
      image: 'https://www.gokitetours.com/wp-content/uploads/2025/01/10-Best-Places-to-Visit-in-Andaman-and-Nicobar-in-2025-1200x720.webp'
    }

  ];

  constructor() {}

  getDestinations(): Destination[] {
    return this.destinations;
  }

  getDestinationById(id: number): Destination | undefined {
    return this.destinations.find(d => d.id === id);
  }

}
