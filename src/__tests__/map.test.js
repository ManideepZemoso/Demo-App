import React from 'react';
import { shallow,configure ,mount} from 'enzyme';
import Map from "../components/Map/Map";
import mapboxgl from "mapbox-gl";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ZoomInIcon from "@material-ui/icons/ZoomIn";

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() });



jest.mock('mapbox-gl', () => {
    const mockMap = jest.fn(() => ({
        on: jest.fn(),
        off: jest.fn(),
        getCenter: jest.fn(),
        flyTo: jest.fn(),
        zoomIn:jest.fn(),
        zoomOut:jest.fn(),
        getZoom: jest.fn(),
        remove: jest.fn()
    }));


    const mockPopup = jest.fn(() => ({
        setLngLat: jest.fn(() => mockPopup()),
        setDOMContent: jest.fn(() => mockPopup()),
        remove: jest.fn(() => mockPopup()),
        addTo: jest.fn(() => mockPopup()),
        setMaxWidth: jest.fn(() => mockPopup())
    }));

    const mockMarker = jest.fn(() => ({
        setLngLat: jest.fn(() => mockMarker()),
        remove: jest.fn(() => mockMarker()),
        addTo: jest.fn(() => mockMarker()),
        getElement: jest.fn(() => mockMarker()),
        on: jest.fn(),
        getLngLat: jest.fn()
    }));

    return {
        Map: mockMap,
        NavigationControl: jest.fn(),
        GeolocateControl: jest.fn(() => ({
            on: jest.fn(),
            trigger: jest.fn()
        })),
        Popup: mockPopup,
        LngLat:jest.fn((lat, lng)=>({
            lat,lng,
            wrap :jest.fn(()=>({
                lat,lng
            }))
        })),
        Marker: mockMarker,
        ScaleControl: jest.fn()
    };
});
describe('<Map/>', () => {


    const getMockMapObject = () => mapboxgl.Map.mock.results[0].value;


    const props = {
        lat: 1,
        lng: 1,
        zoom: 10,
        mapStyle: 'mapbox://styles/mapbox/streets-v11',
        UpdateMapStyle: jest.fn(),
        isCallFromLocation: jest.fn(),
        isFromNewlocation: jest.fn(),
        UpdateCordinates: jest.fn(),
        AddLocation: jest.fn(),
        lastlocationId: 0
    };
    afterEach(() => {
        mapboxgl.Map.mockClear();
    });

    it('should update map center when move ends', function () {
        const component = shallow(<Map {...props} />).dive();
        const mockMapObject = getMockMapObject();
        const mockZoom = 13;
        const mockCenter = {lat: 1, lng: 1};
        const zoomIn = jest.fn();
        mockMapObject.getZoom.mockReturnValue(mockZoom);
        mockMapObject.getCenter.mockReturnValue(mockCenter);
        const onMoveEndCall = mockMapObject.on.mock.calls.find(call => call[0] === 'moveend');
        onMoveEndCall[1]({notFromUser: false});

        expect(props.UpdateCordinates).toHaveBeenCalledWith(mockCenter.lng, mockCenter.lat, mockZoom);
    });
    it('should should show sidebar which contains longitude, latitude,zoom', function () {
        const wrapper = mount(<Map {...props}/>);
        // console.log(wrapper.html())
        const sideBar = wrapper.find('div div.Map-sidebarStyle-1 div');
        expect(sideBar.text()).toBe('Longitude: 1 | Latitude: 1 | Zoom: 10');
        });

    it('should call zoomIn method when we click on zoomIn button', function () {
        const component = mount(<Map {...props} />);
        const zoomInbutton = component.find('div.Map-buttonStyle-2 button[id="zoomIn"] svg.MuiSvgIcon-root');
        //console.log(zoomInbutton.html());
        zoomInbutton.simulate('click');
        const mockMapObject = getMockMapObject();
        expect(mockMapObject.zoomIn.mock.calls.length).toEqual(1);

    });

    it('should call zoomOut method when we click on zoomOut button', function () {
        const component = mount(<Map {...props} />);
        const zoomOutbutton = component.find('div.Map-buttonStyle-2 button[id="zoomOut"] svg.MuiSvgIcon-root');
        //console.log(zoomInbutton.html());
        zoomOutbutton.simulate('click');
        const mockMapObject = getMockMapObject();
        expect(mockMapObject.zoomOut.mock.calls.length).toEqual(1);

    });
    it('should call changeView method when we click on changeView button', function () {
        const component = mount(<Map {...props} />);
        const zoomOutbutton = component.find('div.Map-buttonStyle-2 button[id="changeView"] svg.MuiSvgIcon-root');
        //console.log(zoomInbutton.html());
        zoomOutbutton.simulate('click');
        const mockMapObject = getMockMapObject();
        expect(props.UpdateCordinates).toHaveBeenCalled();
       // expect(mockMapObject.zoomOut.mock.calls.length).toEqual(1);

    });
    it('should flyto method called when we give input and search submit button', function () {
        const component = mount(<Map {...props} />);
        const searchButton = component.find('div.Map-searchboxStyle-7 button[id="searchSubmit"]');
        //console.log(zoomInbutton.html());
        searchButton.simulate('click');
        const mockMapObject = getMockMapObject();
        //expect(props.UpdateCordinates).toHaveBeenCalled();
        expect(mockMapObject.flyTo.mock.calls.length).toEqual(1);

    });

});


    /*describe('Testing map component', () => {
        const getMockMapObject = () => mapboxgl.Map.mock.results[0].value;
        const props = {
            lat: 1,
            lng: 1,
            zoom: 10,
            mapStyle: 'mapbox://styles/mapbox/streets-v11',
            UpdateMapStyle: jest.fn(),
            isCallFromLocation: jest.fn(),
            isFromNewlocation: jest.fn(),
            UpdateCordinates: jest.fn(),
            AddLocation: jest.fn(),
            lastlocationId: 0
        };
        afterEach(() => {
            mapboxgl.Map.mockClear();
        });
    it('should call zoomIn method when we click on zoomIn button', function () {
        const component = mount(<Map {...customProps} />);
        const zoomInbutton = component.find('MuiButtonBase-root MuiIconButton-root Map-zoomIn-4');
        zoomInbutton.simulate('OnClick');
        expect(zoomIn).toHaveBeenCalled();


    });

/!*    it('should call zoomOut method when we click on zoomOut button', function () {
        const UpdateCordinates = jest.fn();
        const AddLocation = jest.fn();
        const zoomOut = jest.fn();
        const customProps = {
            lat: 0,
            lng: 0,
            zoom: 5,
            isCallFromLocation: false,
            isFromNewlocation: false,
            UpdateCordinates: UpdateCordinates,
            AddLocation: AddLocation,
            lastlocationId: 0
        }
        const component = mount(<Map{...customProps} />);
        const zoomOutButton = component.find('ZoomOutIcon');
        zoomOutButton.simulate('click');
        expect(zoomOut).toHaveBeenCalled();
    });

    it('should toggle between satellite and street mode and changeView method when we click on toggle button', function () {
        const UpdateCordinates = jest.fn();
        const AddLocation = jest.fn();
        const changeView = jest.fn();
        const customProps = {
            lat: 0,
            lng: 0,
            zoom: 5,
            isCallFromLocation: false,
            isFromNewlocation: false,
            UpdateCordinates: UpdateCordinates,
            AddLocation: AddLocation,
            lastlocationId: 0
        }
        const component = mount(<Map{...customProps} />);
        const PublicIconButton = component.find('PublicIcon');
        PublicIconButton.simulate('click');
        expect(changeView).toHaveBeenCalled();
    });*!/
/!*it('testing',function (){
    expect(2 + 2).toBe(4);
})*!/
});*/