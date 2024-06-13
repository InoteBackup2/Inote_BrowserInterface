import { TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';

@NgModule() class AnyModule{}

export const describeModule = function(moduleType: typeof AnyModule){
    describe(moduleType.name, () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [moduleType]
            });
        });
    
        it('initializes', () => {
            const module = TestBed.inject(moduleType);
            expect(module).toBeTruthy();
        })
    });
}