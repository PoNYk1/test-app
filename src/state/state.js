import Vuex from 'vuex';
import Vue from 'vue';

Vue.use (Vuex)

export default new Vuex.Store ({
  state: { 
    peopleDate: [ // Входной массив
      {
        name: 'Джордж Вашингтон',
        companyName: 'ООО "Синергия"',
        positionName: 'Первый президент США',
        hireDate: '1789-04-30',
        fireDate: '1797-03-04',
        salary: 1000,
        fraction: 100,
        base: 1000,
        advance: 1000,
        byHours: false
      },
      {
        name: 'Ричард I Львиное Сердце',
        companyName: 'ООО "Синергия"',
        positionName: 'Король Англии',
        hireDate: '1189-01-01',
        fireDate: '1199-05-17',
        salary: 1000,
        fraction: 100,
        base: 1000,
        advance: 1000,
        byHours: true
      },
      {
        name: 'Джейсон Стейтем',
        companyName: 'ООО "Синергия"',
        positionName: 'Бейкон',
        hireDate: '1998-09-01',
        fireDate: null,
        salary: 1000,
        fraction: 100,
        base: 1000,
        advance: 1000,
        byHours: false
      },
      {
        name: 'Тарантино К. Дж.',
        companyName: 'ООО "Синергия"',
        positionName: 'Джимми',
        hireDate: '1994-04-15',
        fireDate: null,
        salary: 1000,
        fraction: 100,
        base: 1000,
        advance: 1000,
        byHours: false
      },
      {
        name: 'Камбербэтч Б.',
        companyName: 'ООО "Синергия"',
        positionName: 'Смауг',
        hireDate: '1000-01-01',
        fireDate: '2941-10-09',
        salary: 1000,
        fraction: 100,
        base: 1000,
        advance: 1000,
        byHours: false
      },
      {
        name: 'Крузенштерн И. Ф.',
        companyName: 'ООО "Синергия"',
        positionName: 'Человек и пароход',
        hireDate: '1770-11-08',
        fireDate: null,
        salary: 1000,
        fraction: 100,
        base: 1000,
        advance: 1000,
        byHours: false
      },
      {
        name: 'Бендер С. Р.',
        companyName: '"Planet Express"',
        positionName: 'Робот-сгибальщик',
        hireDate: '2997-03-27',
        fireDate: null,
        salary: 1000,
        fraction: 100,
        base: 1000,
        advance: 1000,
        byHours: true
      }
    ],
    visibleArr: [], // Видимый массив
    selectedPeopleArr: [], // Массив выбранных строк
    search: '', // Строка поиска
    selectedNull: false // Переменная для события обнуления выбранных строк
  },
  mutations: {
    onSearch (state, text) { // Передача значения для поиска
      state.search = text.search
    },
    showDismissed (state, bool) { // Показывать уволенных
      if (bool.state == false) {
        state.visibleArr = state.peopleDate.filter (el => el.fireDate == null)
      } else {
        state.visibleArr = state.peopleDate
      }
    },
    selectedPeople (state, selected) { // Присвоение внешних выбранных строк
      state.selectedPeopleArr = selected.people
    },
    dismiss (state) {   // Событие увольнение
      state.peopleDate.forEach (item => {
        state.selectedPeopleArr.forEach (upItem => {
          if (item.name == upItem.name && item.fireDate == null) {
            item.fireDate = new Date().toLocaleDateString ()
            upItem.fireDate = new Date().toLocaleDateString ()
          }
        })
      })
      state.selectedNull = true
    },
    setHours (state, item) {  // Обновление состояния byHours 
      state.peopleDate.forEach (el => {
        if (el.name == item.name) {
          el.byHours = !el.byHours
        }
      })
    },
    udateValume (state, prop) {  // Обновление внутренних данных человека
      state.peopleDate.forEach (el => {
        if (el.name == prop.item.name) {
          if (prop.props == "salaryAndFraction") {
            el.salary = prop.val
            el.fraction = prop.val2
          }
          if (prop.props == "base") {
            el.base = prop.val
          }
          if (prop.props == "advance") {
            el.advance = prop.val
          }
        }
      })
    },
    selectedNullBack (state) {  // Переключение обнуления выбранных строк
      state.selectedNull = false
    }
  },
  getters: {
    visibleArr (state) {
      return state.visibleArr.map (item => {
        return {
          ...item, 
          salaryAndFraction: `${item.salary} (${item.fraction}%)`,
          dismiss: item.fireDate != null ? true : false
        }
      })
    }
  }
})