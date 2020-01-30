import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Polyline,
  LatLng,
  Marker
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { GoogleMapsMapTypeId } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-polyline',
  templateUrl: './polyline.page.html',
  styleUrls: ['./polyline.page.scss'],
})
export class PolylinePage implements OnInit {

  map: GoogleMap;

  constructor(private platform: Platform) { }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    let HND_AIR_PORT = {lat: 35.548852, lng: 139.784086};
    let SFO_AIR_PORT = {lat: 37.615223, lng: -122.389979};
    let HNL_AIR_PORT = {lat: 21.324513, lng: -157.925074};
    let AIR_PORTS = [
      HND_AIR_PORT,
      HNL_AIR_PORT,
      SFO_AIR_PORT
    ];

    let L1 = {lat: 21.327153, lng: -157.928671};
    let L2 = {lat: 21.327453, lng: -157.925141};
    let L3 = {lat: 21.325714, lng: -157.925173};
    let L4 = {lat: 21.325824, lng: -157.927469 };

    AIR_PORTS = [
      L1, L2, L3, L4
    ];

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: AIR_PORTS
      },
      mapType: GoogleMapsMapTypeId.SATELLITE
    });

    this.map.addMarkerSync({
      position: L1,
      icon: 'green'
    });

    this.map.addMarkerSync({
      position: L4,
      icon: 'green'
    });

    let polyline: Polyline = this.map.addPolylineSync({
      points: [L1, L2],
      color: '#AA00FF',
      width: 4,
      geodesic: false,
      clickable: true  // clickable = false in default
    });

    polyline = this.map.addPolylineSync({
      points: [L1, L3],
      color: '#AAFF00',
      width: 4,
      geodesic: false,
      clickable: true  // clickable = false in default
    });

    polyline = this.map.addPolylineSync({
      points: [L1, L4],
      color: '#00AAFF',
      width: 4,
      geodesic: false,
      clickable: true  // clickable = false in default
    });

    polyline = this.map.addPolylineSync({
      points: [L4, L3],
      color: '#2222FF',
      width: 4,
      geodesic: false,
      clickable: true  // clickable = false in default
    });
    polyline = this.map.addPolylineSync({
      points: [L3, L2],
      color: '#80FF00',
      width: 4,
      geodesic: false,
      clickable: true  // clickable = false in default
    });
    // polyline = this.map.addPolylineSync({
    //   points: [L3, L1],
    //   color: '#AAFF00',
    //   width: 4,
    //   geodesic: false,
    //   clickable: true  // clickable = false in default
    // });

    polyline.on(GoogleMapsEvent.POLYLINE_CLICK).subscribe((params: any) => {
      let position: LatLng = <LatLng>params[0];

      let marker: Marker = this.map.addMarkerSync({
        position: position,
        title: position.toUrlValue(),
        disableAutoPan: true
      });
      marker.showInfoWindow();
    });
  }

}
