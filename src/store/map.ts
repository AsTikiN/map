import { makeAutoObservable } from "mobx"

class MapObserver {
  token = 'pk.eyJ1IjoiYXN0aWtpbiIsImEiOiJjbGJkZDF5NGwwMDl0M3BvMDhocTljMGs5In0.ynCQEC2NEX1PfFQkafdTRQ';
  markers = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export default new MapObserver() as MapObserver;