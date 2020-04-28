import React from 'react';
import { shallow,configure ,mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Locations from "../components/Location/Locations";
import { BrowserRouter as Router } from 'react-router-dom';

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() });

describe('<Location/>', () => {


    const locationlist= [{
            id: 2,
            Location: "Hyderabad",
            Longitude: 78.4111,
            Latitude: 17.4334
        }
        ];


    const props = {
        sort:true,
        sortFn:jest.fn(),
        updateToBrowser:jest.fn(),
        LocationList:locationlist
    };

    it('should call sortFn when click on sortbyid button ', function () {
        const component = shallow(<Locations {...props}/>);
        const sortbyId = component.find('button[testid="sortBtn"]');
        sortbyId.simulate('click');
        expect(props.sortFn).toHaveBeenCalled();
    });
    it('should call updateBrowser method when click on AddNewlocation button ', function () {
        const component = shallow(<Locations {...props}/>);
        const addnewlocation = component.find('button[testid="AddNewLocationBtn"]');
        addnewlocation.simulate('click');
        expect(props.updateToBrowser).toHaveBeenCalled();
    });

});