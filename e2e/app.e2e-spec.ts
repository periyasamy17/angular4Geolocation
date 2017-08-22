import { RestaurantGoogleMapPage } from './app.po';

describe('restaurant-google-map App', () => {
  let page: RestaurantGoogleMapPage;

  beforeEach(() => {
    page = new RestaurantGoogleMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
