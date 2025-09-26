const { 
  Trip, Day, Location, Activity, Accommodation, Budget, BudgetItem, BudgetDetail,
  Flight, Checklist, ChecklistItem, News, Recommendation, RecommendationItem, Tip, TipItem,
  WeatherForecast, sequelize 
} = require("../db/models");

/**
 * Inserts a trip and all related data into the database
 * @param {number} userId - ID of the user creating the trip
 * @param {object} responseData - Full trip response from the API
 */
async function insertTripData(userId, responseData) {
  const t = await sequelize.transaction();

  try {
    const trip = await Trip.create({
      userId,
      name: responseData.tripName,
      startDate: responseData.dateRange.startDate,
      endDate: responseData.dateRange.endDate,
      duration: responseData.duration,
      totalDistance: responseData.totalDistance,
    }, { transaction: t });

    for (const dayData of responseData.days) {
      const day = await Day.create({
        tripId: trip.id,
        dayNumber: dayData.dayNumber,
        date: dayData.date,
        distance: dayData.distance,
        notes: dayData.notes,
      }, { transaction: t });

      const startLocation = await Location.create({
        dayId: day.id,
        name: dayData.startLocation.name,
        address: dayData.startLocation.address,
        lat: dayData.startLocation.coordinates.lat,
        lng: dayData.startLocation.coordinates.lng,
        type: "start",
        time: dayData.startLocation.time,
      }, { transaction: t });

      const endLocation = await Location.create({
        dayId: day.id,
        name: dayData.endLocation.name,
        address: dayData.endLocation.address,
        lat: dayData.endLocation.coordinates.lat,
        lng: dayData.endLocation.coordinates.lng,
        type: "end",
        time: dayData.endLocation.time,
      }, { transaction: t });

      if (dayData.activities) {
        for (const act of dayData.activities) {
          await Activity.create({ dayId: day.id, name: act }, { transaction: t });
        }
      }

      if (dayData.accommodation) {
        await Accommodation.create({ dayId: day.id, name: dayData.accommodation }, { transaction: t });
      }
    }

    const budgetData = responseData.overview?.budget;
    if (budgetData) {
      const budget = await Budget.create({
        tripId: trip.id,
        currency: budgetData.currency,
        totalEstimated: budgetData.totalEstimated,
      }, { transaction: t });

      for (const [category, catData] of Object.entries(budgetData.breakdown)) {
        const budgetItem = await BudgetItem.create({
          budgetId: budget.id,
          category,
          total: catData.total,
          perDay: catData.perDay || null,
        }, { transaction: t });

        if (catData.details) {
          for (const detail of catData.details) {
            await BudgetDetail.create({
              budgetItemId: budgetItem.id,
              ...detail,
            }, { transaction: t });
          }
        }
      }
    }

    const flights = responseData.overview?.flights?.userFlights || [];
    for (const flightData of flights) {
      await Flight.create({
        tripId: trip.id,
        flightNumber: flightData.flightNumber,
        airline: flightData.airline,
        departureAirport: flightData.departure?.airport || null,
        departureDate: flightData.departure?.date || null,
        departureTime: flightData.departure?.time || null,
        arrivalAirport: flightData.arrival?.airport || null,
        arrivalDate: flightData.arrival?.date || null,
        arrivalTime: flightData.arrival?.time || null,
        status: flightData.status,
      }, { transaction: t });
    }

    const checklistSections = responseData.overview?.checklist || {};
    for (const [sectionName, items] of Object.entries(checklistSections)) {
      const checklist = await Checklist.create({
        tripId: trip.id,
        category: sectionName,
      }, { transaction: t });

      for (const item of items) {
        await ChecklistItem.create({
          checklistId: checklist.id,
          name: item.task,
          completed: item.completed,
          importance: item.importance,
          deadline: item.deadline || null,
          recurring: item.recurring || null,
          note: item.note || null,
        }, { transaction: t });
      }
    }

    const newsData = responseData.explore?.news || [];
    for (const newsGroup of newsData) {
      const news = await News.create({
        tripId: trip.id,
        location: newsGroup.location,
        date: newsGroup.date,
      }, { transaction: t });

      for (const article of newsGroup.articles) {
        await news.createArticle({
          title: article.title,
          summary: article.summary,
          relevance: article.relevance,
          source: article.source,
          publishDate: article.publishDate,
        }, { transaction: t });
      }
    }

    const recommendationsData = responseData.explore?.recommendations || [];
    for (const recGroup of recommendationsData) {
      const rec = await Recommendation.create({
        tripId: trip.id,
        category: recGroup.category,
        location: recGroup.location,
      }, { transaction: t });

      for (const item of recGroup.items) {
        await RecommendationItem.create({
          recommendationId: rec.id,
          name: item.name,
          type: item.type,
          description: item.description,
          rating: item.rating,
          priceRange: item.priceRange || null,
          address: item.address || null,
          nearbyAttraction: item.nearbyAttraction || null,
          duration: item.duration || null,
          price: item.price || null,
          bookingRequired: item.bookingRequired || null,
          ticketPrice: item.ticketPrice || null,
        }, { transaction: t });
      }
    }

    const tipsData = responseData.explore?.tips || [];
    for (const tipGroup of tipsData) {
      const tip = await Tip.create({
        tripId: trip.id,
        category: tipGroup.category,
        location: tipGroup.location,
      }, { transaction: t });

      for (const tipItem of tipGroup.tips) {
        await TipItem.create({
          tipId: tip.id,
          title: tipItem.title,
          content: tipItem.content,
          importance: tipItem.importance,
          timing: tipItem.timing,
        }, { transaction: t });
      }
    }

    const weatherData = responseData.overview?.additionalInfo?.weatherForecast || [];
    for (const weather of weatherData) {
      await WeatherForecast.create({
        tripId: trip.id,
        date: weather.date,
        location: weather.location,
        high: weather.high,
        low: weather.low,
        condition: weather.condition,
        precipitation: weather.precipitation,
        recommendation: weather.recommendation,
      }, { transaction: t });
    }

    await t.commit();
    return trip;

  } catch (err) {
    await t.rollback();
    throw err;
  }
}

module.exports = insertTripData;
