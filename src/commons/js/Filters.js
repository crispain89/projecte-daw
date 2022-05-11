import { useEffect, useState } from "react"
import { Button, ButtonGroup, ButtonToolbar, Collapse, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa"


export default function Filters({open, setOpen, eventos}){
    const [selected,setSelected] = useState(0)
    useEffect(()=>{
        let filteredEventos = [...eventos]
        switch (selected) {
            case 1:
                
                break;
            case 2:
                
                break;
            case 3:
                
                break;
        
            default:
                return;
        }
    },[selected])
    return(
        <div className='filters__wrapper'>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                Filtros
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <div className='filters'>
                    <div className='sortings'>
                        <DropdownButton
                        variant="outline-primary"
                        title="Orden"
                        id="input-group-dropdown-1"
                        >
                        <Dropdown.Item href="#">Alfabetico/Ascendente</Dropdown.Item>
                        <Dropdown.Item href="#">Alfabetico/Descendente</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Proximidad/Ascendente</Dropdown.Item>
                        <Dropdown.Item href="#">Proximidad/Descendente</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <ButtonToolbar className='filter__selection' type="checkbox" >
                        <span>Escoge un filtro: </span>
                        <ButtonGroup >
                        <Button onClick={(e)=>{setSelected(1)}} className={`${selected === 1 ? "selected" : ""} button__option`} value={1}>Inscritos</Button>
                        <Button onClick={(e)=>{setSelected(2)}} className={`${selected === 2 ? "selected" : ""} button__option`} value={2}>No inscritos</Button>
                        <Button onClick={(e)=>{setSelected(3)}} className={`${selected === 3 ? "selected" : ""} button__option`} value={3}>Todos</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    <form className='input-group'>
                        <label class="form-label" for="form1">Busca un evento:</label>
                        <div class="form-outline search__wrapper">
                        <input type="search" id="form1" class="form-control" />
                        <button type="button" class="btn btn-primary">
                            <FaSearch/>
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}