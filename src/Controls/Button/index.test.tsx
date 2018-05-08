import { shallow } from 'enzyme';
import * as React from 'react';
import { Button } from '.';

// const Icon: React.SFC<{}> = () => null;

describe('Button', () => {
    it('should call onClick callback', () => {
        const onClick = jest.fn();
        const component = shallow(<Button onClick={onClick} />);
    //     expect(component.find(Icon).length).toBe(1);
        component.simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
