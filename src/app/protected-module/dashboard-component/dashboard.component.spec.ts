import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ProtectedNavComponent } from '../shared-protected-module/protected-nav-component/protected-nav.component';
import { ProtectedUserService } from '../shared-protected-module/user-module/protected-user.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        DashboardComponent,
        ProtectedNavComponent
      ],
      providers: [ProtectedUserService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
